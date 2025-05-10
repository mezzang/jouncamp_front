// src/components/Layout/Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "boxicons/css/boxicons.min.css";
import "../../styles/style.css"; // 프로젝트 스타일 경로에 맞게 조정하세요.
import Header from "../Header"; // 공통 헤더 컴포넌트
import Footer from "../Footer"; // Footer 컴포넌트 임포트

function Layout() {
  console.log("Layout 컴포넌트 렌더링");

  return (
    <>
      {/* Header */}
      <Header isLoggedIn={false} />

      {/* 메인 섹션 */}
      <main id="main">
        <Outlet /> {/* 페이지 콘텐츠 표시 */}
      </main>

      {/* Footer 컴포넌트 사용 */}
      <Footer />

      {/* Back to Top Button */}
      <button
        className="back-to-top d-flex align-items-center justify-content-center"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <i className="bi bi-arrow-up-short"></i>
      </button>
    </>
  );
}

export default Layout;
