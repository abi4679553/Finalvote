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
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300">

      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl 
        shadow-2xl w-96 border border-pink-200
        animate-fadeInUp">

        <h2 className="text-3xl font-extrabold text-center mb-6 
          text-pink-600 animate-pulse">
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
                rounded-xl focus:outline-none focus:ring-2 
                focus:ring-pink-400 transition-all
                hover:scale-[1.02]"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-gradient-to-r 
            from-pink-400 to-pink-500
            text-white py-3 rounded-xl font-semibold
            shadow-lg hover:shadow-pink-300/70
            hover:scale-105 active:scale-95 transition-all"
        >
          Next →
        </button>

        <p className="text-xs text-center text-pink-400 mt-4">
          Secure & Verified Voting System
        </p>
      </div>
    </div>
  );
}
