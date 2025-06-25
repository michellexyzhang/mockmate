import os
import google.generativeai as genai

def configure_gemini():
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise Exception("GOOGLE_API_KEY environment variable not set.")
    genai.configure(api_key=api_key)

def generate_mock_questions(text: str) -> str:
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
    response = model.generate_content(prompt)
    print("\n--- Gemini generated LaTeX ---\n", response.text, "\n--- End Gemini output ---\n", flush=True)
    return response.text

def generate_mock_questions_tex(text: str) -> str:
    """
    Generates a mock exam in LaTeX format from the given text.
    """
    prompt = f"""
    
    IMPORTANT: Do NOT include any markdown code block, triple backticks, or the word 'latex' anywhere in your output. Only output raw LaTeX code, starting with \\documentclass.
    For multiple-choice questions, use itemize for the answer choices (not enumerate). Only use enumerate for the main question list.

    Based on the following text, create a mock exam.

    The output should be a single, complete LaTeX string.
   
    The document class should be 'article'.
    The document must include '\\usepackage{{amsmath, amssymb, enumitem}}' in the preamble.
    The exam should have a clear title. The title should be on a single line and not contain any markdown or special characters like '#'.
    Section titles should not be in math mode (i.e. no '$' signs around them).
    Use latex enclosed in $ for writing mathematical expressions, chemical equations,etc
    Include sections for multiple-choice questions and long-answer questions..

    After generating the latex, replace every single '\' with '\\'

    Here is the text:
    {text}
    """
    configure_gemini()
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)
    return response.text 