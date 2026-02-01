import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UploadVoterID from "./components/Voteridupload";
import FaceScan from "./components/Facescan";
import Voting from "./components/Voting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<UploadVoterID />} />
        <Route path="/facescan" element={<FaceScan />} /> {/* ✅ SAME PATH */}
        <Route path="/vote" element={<Voting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
