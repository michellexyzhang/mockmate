from fastapi import APIRouter, HTTPException
from api.models.question import QuestionRequest, QuestionResponse, TexRequest, TexResponse
from api.services.gemini_service import generate_mock_questions, generate_mock_questions_tex
from api.services.text_extractor import extract_text
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/generate-questions", response_model=QuestionResponse)
async def generate_questions_endpoint(request: QuestionRequest):
    try:
        text = extract_text(request.file_path)
        questions = generate_mock_questions(text)
        return QuestionResponse(questions=questions)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

@router.post("/generate-tex", response_model=TexResponse)
async def generate_tex_endpoint(request: TexRequest):
    try:
        logger.info("Generating LaTeX from text...")
        tex = generate_mock_questions_tex(request.text)
        logger.info("Successfully generated LaTeX.")
        return TexResponse(tex=tex)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

@router.post("/extract-text")
async def extract_text_endpoint(request: dict):
    file_path = request.get("file_path")
    if not file_path:
        raise HTTPException(status_code=400, detail="file_path is required")
    try:
        text = extract_text(file_path)
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 