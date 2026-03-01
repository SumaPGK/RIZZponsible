from repositories.task_repository import TaskRepository
from models.task import TaskCreate, TaskUpdate
from logger import get_logger

logger = get_logger(__name__)

class TaskService:

    def __init__(self):
        self.repo = TaskRepository()
        logger.debug("TaskService initialized")

    def get_all_tasks(self):
        logger.info("Getting all tasks")
        return self.repo.get_all()

    def create_task(self, task: TaskCreate):
        logger.info(f"Creating task: {task.title}")
        data = {k: v for k, v in task.model_dump().items() if v is not None}
        if "deadline" in data and data["deadline"] is not None:
            data["deadline"] = data["deadline"].isoformat()
        result = self.repo.create(data)
        logger.info(f"Task created successfully: {result['id']}")
        return result

    def update_task(self, task_id: str, task: TaskUpdate):
        logger.info(f"Updating task: {task_id}")
        data = {k: v for k, v in task.model_dump().items() if v is not None}
        if "deadline" in data and data["deadline"] is not None:
            data["deadline"] = data["deadline"].isoformat()
        result = self.repo.update(task_id, data)
        logger.info(f"Task updated successfully: {task_id}")
        return result

    def delete_task(self, task_id: str):
        logger.info(f"Deleting task: {task_id}")
        self.repo.delete(task_id)
        logger.info(f"Task deleted successfully: {task_id}")
        return {"message": "Task deleted"}

    def complete_task_by_title(self, title: str):
        logger.info(f"Completing task by title: {title}")
        tasks = self.repo.find_by_title(title)
        if not tasks:
            logger.warning(f"No task found with title: {title}")
            return "Task not found"
        self.repo.update(tasks[0]["id"], {"status": "done"})
        logger.info(f"Task completed: {tasks[0]['title']}")
        return f"Task '{tasks[0]['title']}' marked as complete"

    def delete_task_by_title(self, title: str):
        logger.info(f"Deleting task by title: {title}")
        tasks = self.repo.find_by_title(title)
        if not tasks:
            logger.warning(f"No task found with title: {title}")
            return "Task not found"
        self.repo.delete(tasks[0]["id"])
        logger.info(f"Task deleted: {tasks[0]['title']}")
        return f"Task '{tasks[0]['title']}' deleted"

    def format_tasks_for_ai(self):
        logger.info("Formatting tasks for AI response")
        tasks = self.repo.get_pending()
        if not tasks:
            return "You have no pending tasks."
        task_list = "\n".join(
            [f"- {t['title']} (due: {t.get('deadline', 'no deadline')}, priority: {t.get('priority')})"
             for t in tasks]
        )
        return f"Your pending tasks:\n{task_list}"
