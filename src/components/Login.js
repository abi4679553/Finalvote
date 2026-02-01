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
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        {["name","aadhaar","phone","state","district","taluk"].map((f) => (
          <input
            key={f}
            name={f}
            placeholder={f}
            maxLength={f==="aadhaar"?12:f==="phone"?10:50}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-500 text-white py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
