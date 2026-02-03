import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Voting() {
  const navigate = useNavigate();
  const [vote, setVote] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

    setSubmitted(true);

    const phone = localStorage.getItem("userPhone");

    // 📱 SIMULATED SMS NOTIFICATION
    setTimeout(() => {
      alert(`📩 SMS to ${phone}:\n✅ Your vote was successfully recorded.`);
    }, 800);

    // 🏁 END SESSION & RETURN TO LOGIN
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 2500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center
      bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 overflow-hidden">

      {/* floating blobs */}
      <div className="absolute w-72 h-72 bg-pink-300/40 rounded-full 
        top-10 left-10 blur-3xl animate-blob"></div>
      <div className="absolute w-72 h-72 bg-rose-400/40 rounded-full 
        bottom-10 right-10 blur-3xl animate-blob animation-delay-2000"></div>

      <div className={`relative bg-white/90 backdrop-blur-lg p-8 rounded-3xl
        shadow-2xl w-96 border border-pink-200 text-center space-y-6
        transition-all ${submitted ? "scale-105" : "animate-fadeInUp"}`}>

        <h2 className="text-3xl font-extrabold text-pink-600 animate-textGlow">
          🗳️ Cast Your Vote
        </h2>

        {!submitted && (
          <div className="flex flex-col gap-4 text-left">
            {["Party A", "Party B"].map((p) => (
              <label
                key={p}
                className="flex items-center gap-2 p-3 rounded-xl
                  border border-pink-200 cursor-pointer
                  hover:bg-pink-50 hover:scale-[1.02]
                  transition-all"
              >
                <input
                  type="radio"
                  name="vote"
                  value={p}
                  onChange={(e) => setVote(e.target.value)}
                  className="accent-pink-500"
                />
                {p}
              </label>
            ))}
          </div>
        )}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-400 to-rose-500
              text-white py-3 rounded-xl font-semibold shadow-lg
              hover:scale-105 active:scale-95 transition-all"
          >
            Submit Vote
          </button>
        ) : (
          <div className="text-green-600 font-bold text-xl animate-bounce">
            ✅ Vote Submitted Successfully
          </div>
        )}

        <p className="text-xs text-pink-400 mt-2 animate-fadeIn">
          Your vote is private and secure
        </p>
      </div>

      {/* animations */}
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
          50% { filter: drop-shadow(0 0 10px #ec4899); }
        }
        .animate-textGlow {
          animation: textGlow 2s infinite;
        }
      `}</style>
    </div>
  );
}
