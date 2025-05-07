// src/routes/ProtectedRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // 로그인 안된 상태면 로그인 페이지로 리다이렉트
    return <Navigate to="/member/login" />;
  }

  return children;
}

export default ProtectedRoute;
