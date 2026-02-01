import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FaceScan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
      return;
    }

    if (!localStorage.getItem("voterIdImage")) {
      navigate("/upload");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => alert("Camera access denied"));
  }, [navigate]);

  const captureFace = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0);
    localStorage.setItem("faceImage", canvas.toDataURL("image/png"));
    setCaptured(true);
  };

  const verify = () => {
    if (!captured) {
      alert("❌ Capture face first");
      return;
    }

    const voterImage = localStorage.getItem("voterIdImage");
    const faceImage = localStorage.getItem("faceImage");

    // 🔥 FAKE FACE MATCH (Demo)
    if (Math.abs(voterImage.length - faceImage.length) < 5000) {
      alert("✅ Face matched");
      localStorage.setItem("faceVerified", "true");
      navigate("/vote");
    } else {
      alert("❌ Face not matched");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100">
      <video ref={videoRef} autoPlay className="w-72 mb-4 rounded" />
      <canvas ref={canvasRef} hidden />

      <button
        onClick={captureFace}
        className="mb-2 bg-pink-500 text-white px-4 py-2 rounded"
      >
        Capture Face
      </button>

      <button
        onClick={verify}
        className="bg-pink-400 text-white px-4 py-2 rounded"
      >
        Verify & Continue
      </button>
    </div>
  );
}
