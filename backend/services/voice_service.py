import openai
import os
from logger import get_logger

logger = get_logger(__name__)

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def transcribe_audio(file):
    logger.info("Transcribing audio with Whisper...")
    contents = await file.read()
    
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=(file.filename, contents, file.content_type),
    )
    
    logger.info(f"Transcription complete: {transcript.text}")
    return transcript.text