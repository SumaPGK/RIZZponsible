import anthropic
import os
from services.task_service import TaskService
from prompt import get_system_prompt
from logger import get_logger

logger = get_logger(__name__)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
task_service = TaskService()

tools = [
    {
        "name": "create_task",
        "description": "Create a new task",
        "input_schema": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "description": {"type": "string"},
                "notes": {"type": "string"},
                "deadline": {"type": "string", "description": "ISO 8601 datetime"},
                "priority": {"type": "string", "enum": ["low", "medium", "high"]}
            },
            "required": ["title"]
        }
    },
    {
        "name": "list_tasks",
        "description": "List all tasks regardless of status. Always call this before updating or deleting a task.",
        "input_schema": {"type": "object", "properties": {}}
    },
    {
        "name": "update_task_status",
        "description": "Update the status of a task to pending, in_progress, or done. Use in_progress when user says they started working on something. Use done only when user explicitly says they finished.",
        "input_schema": {
            "type": "object",
            "properties": {
                "title": {"type": "string", "description": "Exact title of the task to update"},
                "status": {"type": "string", "enum": ["pending", "in_progress", "done"]}
            },
            "required": ["title", "status"]
        }
    },
    {
        "name": "delete_task",
        "description": "Delete a task by title",
        "input_schema": {
            "type": "object",
            "properties": {
                "title": {"type": "string"}
            },
            "required": ["title"]
        }
    }
]


def execute_tool(tool_name: str, tool_input: dict) -> str:
    logger.info(f"Executing tool: {tool_name} with input: {tool_input}")

    if tool_name == "create_task":
        from models.task import TaskCreate
        task = TaskCreate(**tool_input)
        result = task_service.create_task(task)
        logger.info(f"Tool create_task succeeded: {result['id']}")
        return f"Task '{result['title']}' created successfully."

    elif tool_name == "list_tasks":
        from services.supabase_client import supabase
        result = supabase.table("tasks").select("*").execute()
        if not result.data:
            return "You have no tasks."
        task_list = "\n".join(
            [f"- [{t['status']}] {t['title']} (due: {t.get('deadline', 'no deadline')}, priority: {t.get('priority')})"
             for t in result.data]
        )
        logger.info("Tool list_tasks succeeded")
        return f"All tasks:\n{task_list}"

    elif tool_name == "update_task_status":
        tasks = task_service.repo.find_by_title(tool_input["title"])
        if not tasks:
            return f"Task not found with title '{tool_input['title']}'. Please use list_tasks to find the correct title."
        task_service.repo.update(tasks[0]["id"], {"status": tool_input["status"]})
        logger.info(f"Task '{tasks[0]['title']}' status updated to {tool_input['status']}")
        return f"Task '{tasks[0]['title']}' status updated to {tool_input['status']}."

    elif tool_name == "delete_task":
        result = task_service.delete_task_by_title(tool_input["title"])
        logger.info(f"Tool delete_task succeeded: {result}")
        return result

    logger.warning(f"Unknown tool called: {tool_name}")
    return "Unknown tool."


def chat_with_ai(user_message: str, conversation_history: list = []) -> tuple:
    logger.info(f"Received message: {user_message}")

    messages = conversation_history + [{"role": "user", "content": user_message}]

    logger.debug("Calling Claude API...")
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=get_system_prompt(),
        tools=tools,
        messages=messages
    )
    logger.debug(f"Claude response stop reason: {response.stop_reason}")

    while response.stop_reason == "tool_use":
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                logger.info(f"Claude requested tool: {block.name}")
                result = execute_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": result
                })

        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})

        logger.debug("Calling Claude API again with tool results...")
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            system=get_system_prompt(),
            tools=tools,
            messages=messages
        )
        logger.debug(f"Claude follow-up stop reason: {response.stop_reason}")

    for block in response.content:
        if hasattr(block, "text"):
            logger.info(f"AI response: {block.text}")
            messages.append({"role": "assistant", "content": block.text})
            return block.text, messages

    return "Done.", messages