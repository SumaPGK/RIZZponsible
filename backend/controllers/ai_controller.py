from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from services.ai_service import chat_with_ai
from logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/ai", tags=["ai"])

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = []

@router.post("/chat/")
def chat(request: ChatRequest):
    logger.info(f"POST /ai/chat/ called with message: {request.message}")
    reply, updated_history = chat_with_ai(request.message, request.conversation_history)
    logger.info(f"Returning AI reply: {reply}")
    return {
        "reply": reply,
        "conversation_history": updated_history
    }