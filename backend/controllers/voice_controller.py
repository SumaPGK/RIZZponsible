from fastapi import APIRouter, UploadFile, File
from services.voice_service import transcribe_audio
from logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/voice", tags=["voice"])

@router.post("/transcribe/")
async def transcribe(file: UploadFile = File(...)):
    logger.info(f"POST /voice/transcribe/ called with file: {file.filename}")
    transcript = await transcribe_audio(file)
    logger.info(f"Transcription result: {transcript}")
    return {"transcript": transcript}