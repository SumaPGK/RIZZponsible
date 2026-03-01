from services.supabase_client import supabase
from logger import get_logger

logger = get_logger(__name__)

class TaskRepository:

    def get_all(self):
        logger.info("Fetching all tasks")
        result = supabase.table("tasks").select("*").order("deadline").execute()
        logger.info(f"Fetched {len(result.data)} tasks")
        return result.data

    def get_pending(self):
        logger.info("Fetching pending tasks")
        result = supabase.table("tasks").select("*").eq("status", "pending").execute()
        logger.info(f"Fetched {len(result.data)} pending tasks")
        return result.data

    def create(self, data: dict):
        logger.info(f"Creating task: {data.get('title')}")
        result = supabase.table("tasks").insert(data).execute()
        logger.info(f"Task created with id: {result.data[0]['id']}")
        return result.data[0]

    def update(self, task_id: str, data: dict):
        logger.info(f"Updating task id: {task_id} with data: {data}")
        result = supabase.table("tasks").update(data).eq("id", task_id).execute()
        logger.info(f"Task {task_id} updated successfully")
        return result.data[0]

    def delete(self, task_id: str):
        logger.info(f"Deleting task id: {task_id}")
        supabase.table("tasks").delete().eq("id", task_id).execute()
        logger.info(f"Task {task_id} deleted successfully")

    def find_by_title(self, title: str):
        logger.info(f"Searching for task with title: {title}")
        result = supabase.table("tasks").select("*").ilike("title", f"%{title}%").execute()
        logger.info(f"Found {len(result.data)} matching tasks")
        return result.data
