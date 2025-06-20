import tempfile
import subprocess
import os

def compile_tex_to_pdf(latex: str) -> bytes:
    with tempfile.TemporaryDirectory() as tmpdir:
        tex_path = os.path.join(tmpdir, "doc.tex")
        pdf_path = os.path.join(tmpdir, "doc.pdf")
        with open(tex_path, "w") as f:
            f.write(latex)
        try:
            subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", tex_path],
                cwd=tmpdir, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
            with open(pdf_path, "rb") as f:
                return f.read()
        except subprocess.CalledProcessError:
            raise Exception("LaTeX compilation failed") 