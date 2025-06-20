from pydantic import BaseModel

class QuestionRequest(BaseModel):
    file_path: str

class QuestionResponse(BaseModel):
    questions: str

class TexRequest(BaseModel):
    text: str

class TexResponse(BaseModel):
    tex: str 