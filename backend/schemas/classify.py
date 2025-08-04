from pydantic import BaseModel
from typing import List

class Detection(BaseModel):
    classification : str
    confidence : float
    bounding_box : list[float]

    class config:
        orm_mode = True
    
class PredictionResult(BaseModel):
    detections: List[Detection]
    image_base64: str
