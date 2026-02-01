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
    navigate("/facescan"); // ✅ FIXED
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Upload Voter ID
        </h2>

        <label className="block border-2 border-dashed p-6 text-center cursor-pointer mb-4">
          {fileName || "Click to upload"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFile}
          />
        </label>

        <button
          onClick={handleNext}
          className="w-full bg-pink-500 text-white py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
