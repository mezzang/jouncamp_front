// src/components/Layout/LayoutMain.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "boxicons/css/boxicons.min.css";
import "../../styles/style.css"; // 스타일 경로는 프로젝트에 맞게 조정하세요.

import Header from "../Header"; // 공통 Header 컴포넌트 사용
import Footer from "../Footer"; // Footer 컴포넌트 추가

function LayoutMain() {
  console.log("LayoutMain 렌더링");

  return (
    <>
      {/* Header */}
      <Header isLoggedIn={false} />

      {/* Hero Section */}
      <section
        id="hero"
        className="d-flex justify-content-center align-items-center"
      >
        <div className="container position-relative">
          <h1>
            Learning Today,
            <br />
            Leading Tomorrow
          </h1>
          <h2>
            We are team of talented designers making websites with Bootstrap
          </h2>
          <Link to="/courses" className="btn-get-started">
            Get Started
          </Link>
        </div>
      </section>

      {/* Main Body */}
      <main id="main">
        <Outlet />
      </main>

      {/* Footer 컴포넌트 사용 */}
      <Footer />

      {/* Back to top button */}
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

export default LayoutMain;
