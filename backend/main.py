from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import shutil
import os
from pydantic import BaseModel

from text_extractor import extract_text
from gemini import generate_mock_questions

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create an uploads directory if it doesn't exist
UPLOADS_DIR = "uploads"
os.makedirs(UPLOADS_DIR, exist_ok=True)

class QuestionRequest(BaseModel):
    file_path: str

class QuestionResponse(BaseModel):
    questions: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    allowed_extensions = {".pdf", ".docx", ".txt"}
    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF, DOCX, and TXT are allowed.")

    file_path = os.path.join(UPLOADS_DIR, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"filename": file.filename, "path": file_path}

@app.post("/generate-questions", response_model=QuestionResponse)
async def generate_questions_endpoint(request: QuestionRequest):
    try:
        text = extract_text(request.file_path)
        questions = generate_mock_questions(text)
        return QuestionResponse(questions=questions)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}") 