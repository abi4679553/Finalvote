import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadVoterID() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      alert("❌ Login first");
      navigate("/");
    }
  }, [navigate]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("voterIdImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    if (!fileName) {
      alert("❌ Upload Voter ID");
      return;
    }
    navigate("/facescan");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300">

      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl
        shadow-2xl w-96 border border-pink-200
        animate-fadeInUp">

        <h2 className="text-3xl font-extrabold mb-6 text-center
          text-pink-600 animate-pulse">
          🪪 Upload Voter ID
        </h2>

        <label className="w-full flex flex-col items-center justify-center
          px-4 py-8 mb-6
          bg-pink-50 border-2 border-dashed border-pink-300
          rounded-2xl cursor-pointer
          hover:bg-pink-100 hover:scale-105
          transition-all duration-300
          text-pink-500 text-center">

          <span className="text-sm font-medium mb-2">
            {fileName ? "✅ File Selected" : "Click or Drag to Upload"}
          </span>

          <span className="text-xs text-pink-400">
            {fileName || "PNG / JPG image only"}
          </span>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFile}
          />
        </label>

        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r
            from-pink-400 to-pink-500
            text-white py-3 rounded-xl font-semibold
            shadow-lg hover:shadow-pink-300/70
            hover:scale-105 active:scale-95
            transition-all"
        >
          Next →
        </button>

        <p className="text-xs text-center text-pink-400 mt-4">
          Secure ID verification
        </p>
      </div>
    </div>
  );
}