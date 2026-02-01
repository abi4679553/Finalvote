import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Voting() {
  const navigate = useNavigate();
  const [vote, setVote] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("faceVerified")) {
      alert("❌ Face not verified");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = () => {
    if (!vote) {
      alert("❌ Please select a party");
      return;
    }

    alert("✅ Vote submitted successfully");

    // Clear session
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center
      bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 animate-fadeIn">

      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl
        shadow-2xl w-96 border border-pink-200 text-center space-y-6">

        <h2 className="text-3xl font-extrabold text-pink-600 animate-pulse">
          🗳️ Cast Your Vote
        </h2>

        <div className="flex flex-col gap-4 text-left">
          <label className="flex items-center gap-2 p-3 rounded-xl border border-pink-200
            hover:bg-pink-50 cursor-pointer transition-all">
            <input
              type="radio"
              name="vote"
              value="Party A"
              onChange={(e) => setVote(e.target.value)}
              className="accent-pink-500"
            />
            Party A
          </label>

          <label className="flex items-center gap-2 p-3 rounded-xl border border-pink-200
            hover:bg-pink-50 cursor-pointer transition-all">
            <input
              type="radio"
              name="vote"
              value="Party B"
              onChange={(e) => setVote(e.target.value)}
              className="accent-pink-500"
            />
            Party B
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500
            text-white py-3 rounded-xl font-semibold shadow-lg
            hover:scale-105 active:scale-95 transition-all"
        >
          Submit Vote
        </button>

        <p className="text-xs text-pink-400 mt-2">
          Your vote is private and secure
        </p>
      </div>
    </div>
  );
}
