from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from api.models.question import TexResponse
from api.services.latex_service import compile_tex_to_pdf

router = APIRouter()

@router.post("/compile-pdf")
async def compile_pdf(tex: TexResponse):
    print("TEST LOG")
    try:
        print("[LOG] Received LaTeX for compilation:\n", tex.tex)
        pdf_bytes = compile_tex_to_pdf(tex.tex)
        return Response(content=pdf_bytes, media_type="application/pdf")
    except Exception as e:
        print("[ERROR] LaTeX compilation error:", str(e))
        print("[ERROR] LaTeX code that caused the error:\n", tex.tex)
        # Return the full error log for debugging
        raise HTTPException(status_code=500, detail=str(e)) 

        
