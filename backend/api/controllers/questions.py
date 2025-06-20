from fastapi import APIRouter, HTTPException
from api.models.question import QuestionRequest, QuestionResponse, TexRequest, TexResponse
from api.services.gemini_service import generate_mock_questions, generate_mock_questions_tex
from api.services.text_extractor import extract_text

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
        tex = generate_mock_questions_tex(request.text)
        return TexResponse(tex=tex)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate LaTeX: {e}") 