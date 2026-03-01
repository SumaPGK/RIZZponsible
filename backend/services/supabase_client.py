from supabase import create_client
from dotenv import load_dotenv
from logger import get_logger
import os

load_dotenv()

logger = get_logger(__name__)

logger.info("Initializing Supabase client...")

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

logger.info("Supabase client initialized successfully")
