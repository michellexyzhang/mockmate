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
            # Run pdflatex twice for references, etc.
            for _ in range(2):
                subprocess.run(
                    ["pdflatex", "-interaction=nonstopmode", "doc.tex"],
                    cwd=tmpdir, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
                )
            with open(pdf_path, "rb") as f:
                return f.read()
        except subprocess.CalledProcessError as e:
            # Return the error log for debugging
            raise Exception(f"LaTeX compilation failed:\n{e.stdout.decode()}\n{e.stderr.decode()}")