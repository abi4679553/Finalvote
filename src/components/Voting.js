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

    // clear session
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-6 rounded-xl w-80 text-center">
        <h2 className="text-xl font-bold mb-4">🗳️ Voting</h2>

        <label className="block mb-2">
          <input type="radio" name="vote" value="Party A" onChange={(e) => setVote(e.target.value)} />
          Party A
        </label>

        <label className="block mb-4">
          <input type="radio" name="vote" value="Party B" onChange={(e) => setVote(e.target.value)} />
          Party B
        </label>

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-500 text-white py-2 rounded"
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
}
