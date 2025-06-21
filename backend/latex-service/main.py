import logging
import os
import subprocess
import tempfile
from fastapi import FastAPI, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TexRequest(BaseModel):
    tex: str

@app.get("/")
def read_root():
    return {"message": "LaTeX compilation service is running."}

@app.post("/compile-pdf")
async def compile_pdf(request: TexRequest):
    with tempfile.TemporaryDirectory() as tmpdir:
        tex_path = os.path.join(tmpdir, "doc.tex")
        pdf_path = os.path.join(tmpdir, "doc.pdf")

        with open(tex_path, "w") as f:
            f.write(request.tex)

        try:
            # Run pdflatex twice to be safe, capturing output
            for i in range(2):
                result = subprocess.run(
                    ["pdflatex", "-interaction=nonstopmode", "-output-directory", tmpdir, tex_path],
                    capture_output=True,
                    text=True,
                    check=True, # This will raise CalledProcessError on non-zero exit codes
                )
                logger.info(f"pdflatex run {i+1} stdout: {result.stdout}")
                if result.stderr:
                    logger.error(f"pdflatex run {i+1} stderr: {result.stderr}")

            with open(pdf_path, "rb") as f:
                pdf_bytes = f.read()

            return Response(content=pdf_bytes, media_type="application/pdf")

        except subprocess.CalledProcessError as e:
            logger.error("LaTeX compilation failed.")
            logger.error(f"Return code: {e.returncode}")
            logger.error(f"stdout: {e.stdout}")
            logger.error(f"stderr: {e.stderr}")
            # Also log the tex string that failed
            logger.error(f"Failing LaTeX source: {request.tex}")
            raise HTTPException(status_code=500, detail=f"LaTeX compilation failed. Check logs for details.") 