from fastapi import APIRouter
from models.task import TaskCreate, TaskUpdate
from services.task_service import TaskService
from logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/tasks", tags=["tasks"])
task_service = TaskService()

@router.get("/")
def get_tasks():
    logger.info("GET /tasks/ called")
    result = task_service.get_all_tasks()
    logger.info(f"Returning {len(result)} tasks")
    return result

@router.post("/")
def create_task(task: TaskCreate):
    logger.info(f"POST /tasks/ called with title: {task.title}")
    result = task_service.create_task(task)
    logger.info(f"Task created: {result['id']}")
    return result

@router.patch("/{task_id}/")
def update_task(task_id: str, task: TaskUpdate):
    logger.info(f"PATCH /tasks/{task_id}/ called")
    result = task_service.update_task(task_id, task)
    logger.info(f"Task updated: {task_id}")
    return result

@router.delete("/{task_id}/")
def delete_task(task_id: str):
    logger.info(f"DELETE /tasks/{task_id}/ called")
    result = task_service.delete_task(task_id)
    logger.info(f"Task deleted: {task_id}")
    return result
