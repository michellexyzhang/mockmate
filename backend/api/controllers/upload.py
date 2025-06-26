from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

UPLOADS_DIR = "uploads"
os.makedirs(UPLOADS_DIR, exist_ok=True)

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    allowed_extensions = {".pdf", ".docx", ".txt"}
    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF, DOCX, and TXT are allowed.")

    file_path = os.path.join(UPLOADS_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename, "path": file_path} 