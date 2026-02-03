import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";

export default function UploadVoterID() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("❌ Only image files allowed");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result;

      try {
        const result = await Tesseract.recognize(imageData, "eng");
        const text = result.data.text.toLowerCase();

        if (!text.includes("voter") && !text.includes("election")) {
          alert("❌ Not a valid Voter ID");
          return;
        }

        localStorage.setItem("voterIdImage", imageData);
        setFileName(file.name);

        alert("✅ Voter ID uploaded");
      } catch {
        alert("❌ OCR failed");
      }
    };

    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    if (!fileName) {
      alert("❌ Upload Voter ID first");
      return;
    }
    navigate("/facescan");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300 overflow-hidden">

      {/* floating background blobs */}
      <div className="absolute w-72 h-72 bg-pink-300/40 rounded-full 
        top-10 left-10 blur-3xl animate-blob"></div>
      <div className="absolute w-72 h-72 bg-rose-400/40 rounded-full 
        bottom-10 right-10 blur-3xl animate-blob animation-delay-2000"></div>

      {/* card */}
      <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl 
        w-96 border border-pink-200
        shadow-[0_20px_50px_rgba(255,105,180,0.35)]
        animate-fadeInUp hover:scale-[1.02] transition">

        <h2 className="text-2xl font-extrabold text-center mb-6
          bg-gradient-to-r from-pink-500 to-rose-500
          bg-clip-text text-transparent animate-textGlow">
          🪪 Upload Voter ID
        </h2>

        <label
          htmlFor="voterUpload"
          className="flex items-center justify-center text-center
            p-6 border-2 border-dashed border-pink-300
            rounded-xl cursor-pointer
            transition-all duration-300
            hover:bg-pink-50 hover:border-pink-400
            hover:scale-[1.02]"
        >
          <span className="text-pink-500 font-semibold">
            {fileName || "📂 Click to Upload Voter ID"}
          </span>
        </label>

        <input
          id="voterUpload"
          type="file"
          accept="image/*"
          hidden
          onChange={handleFile}
        />

        <button
          onClick={handleNext}
          className="relative w-full mt-6 bg-gradient-to-r 
            from-pink-400 to-rose-500
            text-white py-3 rounded-xl font-semibold
            shadow-lg overflow-hidden
            hover:shadow-pink-400/70
            hover:scale-105 active:scale-95 transition-all
            before:absolute before:inset-0 before:bg-white/20
            before:translate-x-[-100%]
            hover:before:translate-x-[100%]
            before:transition-transform before:duration-700"
        >
          Next →
        </button>

        <p className="text-xs text-center text-pink-400 mt-4 animate-fadeIn">
          🔐 OCR-based secure verification
        </p>
      </div>

      {/* custom animations */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes textGlow {
          0%,100% { filter: drop-shadow(0 0 0px #ec4899); }
          50% { filter: drop-shadow(0 0 8px #ec4899); }
        }
        .animate-textGlow {
          animation: textGlow 2s infinite;
        }
      `}</style>
    </div>
  );
}
