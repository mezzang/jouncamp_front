// src/routes/MemberRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Member/LoginPage";
import Register from "../pages/Member/RegisterPage";

function MemberRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} /> {/* ✅ 상대 경로로 수정 */}
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default MemberRoutes;
