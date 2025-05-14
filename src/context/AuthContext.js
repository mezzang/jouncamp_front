// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// 전역 Axios 설정
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // 세션 쿠키가 있는지 확인하는 함수 (세션 상태 확인)
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/api/Member/current-user");

      if (response.data.success && response.data.isAuthenticated) {
        setCurrentUser(response.data.user);
        setIsLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("인증 상태 확인 오류:", error);

      // 백업 세션 체크: current-user가 실패하면 check-session 시도
      if (error.response && error.response.status === 401) {
        try {
          const sessionResponse = await axios.get("/api/Member/check-session");
          if (sessionResponse.data.isAuthenticated) {
            // 세션이 있지만 사용자 정보를 가져오지 못함 - 다시 시도할 수 있음
            setIsLoggedIn(true);
            // 세션이 확인되면 사용자 정보를 다시 요청할 수 있습니다
            try {
              const userResponse = await axios.get("/api/Member/current-user");
              if (userResponse.data.success) {
                setCurrentUser(userResponse.data.user);
              }
            } catch (userError) {
              console.error("사용자 정보 재요청 실패:", userError);
            }
          } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
          }
        } catch (sessionError) {
          console.error("세션 확인 오류:", sessionError);
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 로그인 함수
  const login = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      const response = await axios.post("/api/Member/logout", {});
      if (response.data.success) {
        // 백엔드에서 성공 응답시에만 로그아웃 처리
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("로그아웃 오류:", error);
      // 오류가 발생해도 로컬 상태는 로그아웃 처리
      // (세션이 만료되었거나 이미 로그아웃된 상태일 수 있음)
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
  };

  // 컨텍스트 값
  const value = {
    currentUser,
    isLoggedIn,
    loading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
