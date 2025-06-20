import os
import google.generativeai as genai
from fastapi import HTTPException

def configure_gemini():
    """Configures the Gemini API with the API key from environment variables."""
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GOOGLE_API_KEY environment variable not set.")
    genai.configure(api_key=api_key)

def generate_mock_questions(text: str) -> str:
    """Generates mock questions from the given text using the Gemini API."""
    configure_gemini()
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    You are a test generation assistant. Your task is to analyze the style and format of the questions in the provided document and generate a new set of 5-10 mock exam questions that mimic the original style.

    For example:
    - If the original questions are short-answer, your generated questions should also be short-answer.
    - If the original questions are multiple-choice, your generated questions should also be multiple-choice with a similar number of options.
    - If the original questions are a mix of types, your generated questions should reflect that same mix.

    Analyze the content and structure of the following document and generate a new set of questions based on its content, but in the same style.

    Here is the document text:
    ---
    {text}
    ---
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate questions from Gemini: {e}") 