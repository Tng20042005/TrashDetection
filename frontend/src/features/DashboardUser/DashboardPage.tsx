import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardForm from "./DashboardForm";
import type { User } from "../../types/userType";
import "../../styles/DashboardUser/DashboardPage.css";
import { classifyImage } from "../../api/classifyApi";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"camera" | "image" | null>(null);
  const [, setSelectedImage] = useState<File | null>(null);
  const [, setPreviewUrl] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
  setPredictionResult(null);
  setSelectedImage(null);
  setPreviewUrl(null);
}, [selectedTab]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const canvas = document.createElement("canvas");

    if (selectedTab === "camera") {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 60, max: 60 },
          },
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            interval = setInterval(() => {
              if (!videoRef.current || !overlayCanvasRef.current) return;

              canvas.width = videoRef.current.videoWidth;
              canvas.height = videoRef.current.videoHeight;

              const ctx = canvas.getContext("2d");
              if (!ctx) return;
              ctx.drawImage(videoRef.current, 0, 0);

              canvas.toBlob(async (blob) => {
                if (!blob) return;

                const file = new File([blob], "frame.jpg", { type: "image/jpeg" });
                try {
                  const result = await classifyImage(file);
                  setPredictionResult(result);

                  const overlayCtx = overlayCanvasRef.current!.getContext("2d");
                  if (!overlayCtx) return;

                  overlayCanvasRef.current!.width = canvas.width;
                  overlayCanvasRef.current!.height = canvas.height;
                  overlayCtx.clearRect(0, 0, canvas.width, canvas.height);

                  if (result?.detections) {
                    overlayCtx.strokeStyle = "red";
                    overlayCtx.lineWidth = 2;
                    overlayCtx.font = "16px Arial";
                    overlayCtx.fillStyle = "red";

                    result.detections.forEach((det: any) => {
                      const [x1, y1, x2, y2] = det.bounding_box;
                      const width = x2 - x1;
                      const height = y2 - y1;
                      overlayCtx.strokeRect(x1, y1, width, height);
                      overlayCtx.fillText(
                        `${det.classification} (${(det.confidence * 100).toFixed(1)}%)`,
                        x1,
                        y1 - 5
                      );
                    });
                  }
                } catch (err) {
                  console.error("Lỗi khi phân loại ảnh:", err);
                }
              }, "image/jpeg");
            }, 500);
          }
        })
        .catch((err) => {
          console.error("Không thể truy cập camera:", err);
        });
    }

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      if (interval) clearInterval(interval);
    };
  }, [selectedTab]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const result = await classifyImage(file);
        setPredictionResult(result);
      } catch (error) {
        console.error("Lỗi khi phân loại ảnh:", error);
      }
    }
  };

  const handleLogoutUser = async () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/LoginUser");
  };

  return (
    <div className="user-dashboard">
      <div className="main-content">
        <div className="buttonGroup">
          <button className="cameraButton" onClick={() => setSelectedTab("camera")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
              <path d="M17 10.5V7c0-1.1-.9-2-2-2H4C2.9 5 2 5.9 2 7v10c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z" />
            </svg>
            Camera
          </button>
          <button className="imageButton" onClick={() => setSelectedTab("image")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5C3.89 3 3 3.89 3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2zm-2-2l-3.5-4.5-2.5 3.01L10 12l-4 5h12z" />
            </svg>
            Image
          </button>
        </div>

        <div className="result-area">
          {selectedTab === "camera" && (
            <div className="tab-content" style={{ position: "relative" }}>
              <video ref={videoRef} width="100%" className="camera-preview" />
              <canvas ref={overlayCanvasRef} className="overlay-canvas" style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 10,
                pointerEvents: "none"
              }} />
            </div>
          )}

          {selectedTab === "image" && (
            <div className="tab-content">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {predictionResult?.image_base64 && (
                <div className="prediction-result">
                  <img
                    src={`data:image/jpeg;base64,${predictionResult.image_base64}`}
                    alt="Kết quả"
                    className="annotated-image"
                    style={{ width: "100%", marginTop: "1rem" }}
                  />
                </div>
              )}
            </div>
          )}

          {!selectedTab && <div className="tab-content">Vui lòng chọn một chế độ để bắt đầu.</div>}
        </div>
      </div>

      <div className="user-dashboardSetings">
        <DashboardForm user={user} onLogout={handleLogoutUser} />
      </div>

      <div className="dashboard-footer">
        <p>Intelligent Waste Monitoring System – Graduation Project 2025.</p>
        <p>Contact: maiminhtung2005@gmail.com | VNU University of Engineering and Technology – VNU-UET </p>
        <p>Facebook: https://www.facebook.com/mai.tung.997259 </p>
        <p>Github: https://github.com/Tng20042005 </p>
      </div>
    </div>
  );
}
