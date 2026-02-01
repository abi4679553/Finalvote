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
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => alert("❌ Camera access denied"));
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
    <div className="min-h-screen flex flex-col items-center justify-center
      bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300
      animate-fadeIn">

      <h2 className="text-3xl font-bold text-pink-600 mb-6 animate-pulse">
        🖼️ Face Scan
      </h2>

      <div className="relative w-80 md:w-96 h-96 md:h-[450px] mb-6 rounded-2xl overflow-hidden 
        border-4 border-pink-300 shadow-inner bg-pink-50">
        <video
          ref={videoRef}
          autoPlay
          className={`w-full h-full object-cover rounded-2xl 
            transition-all ${captured ? "opacity-70" : "opacity-100"}`}
        />
        {captured && (
          <div className="absolute inset-0 flex items-center justify-center
            bg-pink-200/40 text-pink-600 font-bold text-3xl animate-pulse rounded-2xl">
            ✅ Face Captured
          </div>
        )}
      </div>

      <canvas ref={canvasRef} hidden />

      <div className="flex flex-col gap-4 w-80 md:w-96">
        <button
          onClick={captureFace}
          className="bg-pink-500 text-white py-3 rounded-xl font-semibold 
            shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          Capture Face
        </button>

        <button
          onClick={verify}
          className="bg-pink-400 text-white py-3 rounded-xl font-semibold
            shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
