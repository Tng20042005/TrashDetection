# Dockerfile cho FastAPI + YOLO + GPU

FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04
FROM python:3.11-slim

RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app

COPY requirements.txt .

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
