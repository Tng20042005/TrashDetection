# ♻️ TrashDetection - AI-powered Waste Detection System

**TrashDetection** is a real-time AI system for detecting waste from images, videos, or webcam input. It uses a deep learning model (YOLOv8 or custom) for object detection, powered by a FastAPI backend and a modern React frontend. The entire system is containerized using Docker and orchestrated with Docker Compose.

---

## 🚀 Key Features

- 📸 Detect waste from webcam, uploaded images, or video.
- 🧠 Supports multiple waste types (plastic, metal, paper, organic, etc.).
- 🌐 Responsive web interface (React + TailwindCSS).
- ⚙️ RESTful API with FastAPI for model inference.
- 🐳 Easily deployable using Docker and Docker Compose.

---

## 🧱 System Architecture

The TrashDetection system is composed of three major components working together:

1. Frontend (React + Tailwind CSS)
The user interface is built using React. It allows users to:

Upload images or stream from their webcam.

View live detection results with bounding boxes and labels.

Interact with the backend via REST API.

2. Backend API (FastAPI)
The backend handles:

Receiving image/video data from the frontend.

Running the detection model (YOLOv8 or any PyTorch-based model).

Returning the detection results (bounding boxes, labels, confidence scores).

Exposing an OpenAPI-compatible /docs interface for testing and integration.

3. AI Model (YOLOv8)
The detection model is implemented in PyTorch, typically using a pretrained YOLOv8 model fine-tuned on a custom trash dataset. It is loaded at backend startup and used for inference upon request.

[ User ] ---> [ Frontend (React) ]
                     |
                     v
       [ Backend API (FastAPI + PyTorch) ]
                     |
                     v
        [ YOLOv8 Inference Model (runs on CPU/GPU) ]
                     |
                     v
         [ Results (labels, boxes) returned to UI ]
