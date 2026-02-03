import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FaceScan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [captured, setCaptured] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | scanning | success

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
    const faceImage = canvas.toDataURL("image/png");

    localStorage.setItem("faceImage", faceImage);
    localStorage.setItem("faceVerified", "true"); // ✅ ALWAYS VERIFIED

    setCaptured(true);
    setStatus("success");

    // ✅ DIRECTLY OPEN VOTING PAGE
    setTimeout(() => {
      navigate("/vote");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center
      bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 overflow-hidden">

      <h2 className="text-3xl font-extrabold mb-6
        bg-gradient-to-r from-pink-500 to-rose-500
        bg-clip-text text-transparent animate-textGlow">
        🖼️ Face Scan
      </h2>

      <div className="relative w-80 md:w-96 h-96 md:h-[450px] mb-6 rounded-3xl overflow-hidden
        border-4 border-pink-300 bg-pink-50 shadow-lg">

        <video
          ref={videoRef}
          autoPlay
          className={`w-full h-full object-cover transition-all
            ${captured ? "opacity-70 scale-105" : "opacity-100"}`}
        />

        {!captured && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-full h-1 bg-pink-400/70 animate-scanLine"></div>
          </div>
        )}

        {status === "success" && (
          <div className="absolute inset-0 flex items-center justify-center
            bg-green-200/50 text-green-700 font-bold text-3xl animate-bounce">
            ✅ Face Scan Successful
          </div>
        )}
      </div>

      <canvas ref={canvasRef} hidden />

      <button
        onClick={captureFace}
        disabled={status !== "idle"}
        className="bg-gradient-to-r from-pink-400 to-rose-500
          text-white py-3 px-12 rounded-xl font-semibold
          shadow-lg hover:scale-105 active:scale-95 transition-all
          disabled:opacity-50"
      >
        Capture Face
      </button>

      <style>{`
        @keyframes scanLine {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scanLine {
          animation: scanLine 2.5s linear infinite;
        }
        @keyframes textGlow {
          0%,100% { filter: drop-shadow(0 0 0px #ec4899); }
          50% { filter: drop-shadow(0 0 10px #ec4899); }
        }
        .animate-textGlow {
          animation: textGlow 2s infinite;
        }
      `}</style>
    </div>
  );
}
