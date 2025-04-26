import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

// 스타일 컴포넌트
const Main = styled.main`
  margin-top: 72px; /* 헤더 높이만큼 여백 추가 */
  min-height: calc(100vh - 72px - 300px); /* 헤더와 푸터 제외한 최소 높이 */
`;

const BackToTop = styled.a`
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 996;
  background: #5fcf80;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.4s;

  &:hover {
    background: #3ac162;
    color: #fff;
  }

  i {
    font-size: 28px;
    line-height: 0;
  }
`;

const Preloader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: #fff;
  display: ${(props) => (props.loading ? "block" : "none")};

  &:before {
    content: "";
    position: fixed;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
    border: 6px solid #5fcf80;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: animate-preloader 1s linear infinite;
  }

  @keyframes animate-preloader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    userId: "",
  });

  useEffect(() => {
    // 페이지 로딩 완료 시 프리로더 숨기기
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // 로그인 상태 확인
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/member/checkLogin");
        setUserData({
          isLoggedIn: response.data.isLoggedIn,
          userId: response.data.userId || "",
        });
      } catch (error) {
        console.error("로그인 상태 확인 오류:", error);
      }
    };

    checkLoginStatus();

    return () => clearTimeout(timer);
  }, []);

  // 세션 타임아웃 관련 함수
  const loginAgainCheck = () => {
    if (
      window.confirm(
        "세션타임이 만료되었습니다.\n정상적인 서비스 진행을 위하여 다시 로그인해 주십시오."
      )
    ) {
      window.location.href = "/Member/Login";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
      <Preloader loading={loading} id="preloader" />
      <Header />
      <Main id="main" data-aos="fade-in">
        <Outlet />
      </Main>
      <Footer />
      <BackToTop
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </BackToTop>

      {/* 세션 타임아웃 관련 스크립트 (필요시 활성화) */}
      {userData.isLoggedIn && (
        <script>
          {/* 
            // 세션 타임아웃 활성화 시 주석 해제
            // setTimeout(loginAgainCheck, 10000);
          */}
        </script>
      )}
    </>
  );
};

export default Layout;
