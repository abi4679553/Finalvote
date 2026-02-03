import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    state: "",
    district: "",
    taluk: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (Object.values(form).some(v => !v)) {
      alert("❌ All fields required");
      return;
    }
    if (form.aadhaar.length !== 12) {
      alert("❌ Aadhaar must be 12 digits");
      return;
    }
    if (form.phone.length !== 10) {
      alert("❌ Phone must be 10 digits");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/upload");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden
      bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300">

      {/* Floating background blobs */}
      <div className="absolute w-72 h-72 bg-pink-300/40 rounded-full 
        top-10 left-10 blur-3xl animate-blob"></div>
      <div className="absolute w-72 h-72 bg-rose-400/40 rounded-full 
        bottom-10 right-10 blur-3xl animate-blob animation-delay-2000"></div>

      {/* Login Card */}
      <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl 
        shadow-[0_20px_50px_rgba(255,105,180,0.35)]
        w-96 border border-pink-200
        animate-fadeInUp hover:scale-[1.02] transition-transform">

        <h2 className="text-3xl font-extrabold text-center mb-6 
          bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent
          animate-textGlow">
          Online Voting Login
        </h2>

        <div className="space-y-4">
          {["name","aadhaar","phone","state","district","taluk"].map((f) => (
            <input
              key={f}
              name={f}
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              maxLength={f==="aadhaar"?12:f==="phone"?10:50}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-200 
                rounded-xl bg-white/80
                focus:outline-none focus:ring-2 
                focus:ring-pink-400 focus:shadow-pink-300/50
                transition-all duration-300
                hover:scale-[1.02]"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="relative w-full mt-6 bg-gradient-to-r 
            from-pink-400 to-rose-500
            text-white py-3 rounded-xl font-semibold
            shadow-lg overflow-hidden
            hover:shadow-pink-400/70
            hover:scale-105 active:scale-95 transition-all
            before:absolute before:inset-0 before:bg-white/20
            before:translate-x-[-100%] hover:before:translate-x-[100%]
            before:transition-transform before:duration-700"
        >
          Next →
        </button>

        <p className="text-xs text-center text-pink-400 mt-4 animate-fadeIn">
          🔒 Secure & Verified Voting System
        </p>
      </div>

      {/* Tailwind custom animations */}
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
