// src/routes/MemberRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Member/LoginPage";
import Register from "../pages/Member/RegisterPage";

function MemberRoutes() {
  return (
    <Routes>
      <Route path="/member/login" element={<Login />} />
      <Route path="/member/register" element={<Register />} />
    </Routes>
  );
}

export default MemberRoutes;
