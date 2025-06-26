FROM python:3.10-slim

WORKDIR /app

# Install TeX Live (full) and other dependencies
RUN apt-get update && apt-get install -y texlive-full && apt-get clean

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]