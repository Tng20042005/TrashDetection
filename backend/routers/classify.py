from fastapi import APIRouter, File, UploadFile
from schemas.classify import PredictionResult, Detection
from ultralytics import YOLO
import cv2
import numpy as np
import base64

router = APIRouter()
model = YOLO(r"TrashDetection\backend\PredictionModel\best.pt")  # Dùng GPU

@router.post("/predict", response_model=PredictionResult)
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img_array = np.frombuffer(contents, dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    results = model(img)
    detections = []

    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls.item())
            class_name = model.names[cls_id]
            confidence = float(box.conf.item())
            xyxy = [int(coord.item()) for coord in box.xyxy[0]]
            detections.append(Detection(
                classification=class_name,
                confidence=confidence,
                bounding_box=xyxy
            ))

    annotated_img = results[0].plot()

    _, img_encoded = cv2.imencode('.jpg', annotated_img)
    img_bytes = img_encoded.tobytes()
    base64_str = base64.b64encode(img_bytes).decode()

    return PredictionResult(
        detections=detections,
        image_base64=base64_str
    )
