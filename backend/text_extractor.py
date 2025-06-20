import os
from docx import Document
from pypdf import PdfReader

def extract_text(file_path: str) -> str:
    """Extracts text from a file, supporting .txt, .docx, and .pdf."""
    _, extension = os.path.splitext(file_path)
    extension = extension.lower()

    if extension == ".txt":
        return extract_text_from_txt(file_path)
    elif extension == ".docx":
        return extract_text_from_docx(file_path)
    elif extension == ".pdf":
        return extract_text_from_pdf(file_path)
    else:
        raise ValueError(f"Unsupported file type: {extension}")

def extract_text_from_txt(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

def extract_text_from_docx(file_path: str) -> str:
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_text_from_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text 