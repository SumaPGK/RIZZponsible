from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from controllers import task_controller, ai_controller, voice_controller
from logger import get_logger

load_dotenv()

logger = get_logger(__name__)

app = FastAPI(title="AI Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_controller.router)
app.include_router(ai_controller.router)
app.include_router(voice_controller.router)

@app.get("/")
def root():
    logger.info("Root endpoint called")
    return {"status": "AI Assistant running"}

logger.info("AI Assistant started successfully")
