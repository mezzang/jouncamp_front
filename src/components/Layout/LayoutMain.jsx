// src/components/Layout/LayoutMain.jsx
import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "boxicons/css/boxicons.min.css";
import "remixicon/fonts/remixicon.css";
import "../../styles/style.css"; // 스타일 경로는 프로젝트에 맞게 조정하세요.

import Header from "../Header"; // 공통 Header 컴포넌트 사용
import Footer from "../Footer"; // Footer 컴포넌트 추가

function LayoutMain() {
  console.log("LayoutMain 렌더링");

  // AOS 초기화 및 기타 스크립트 (React에서는 useEffect로 처리)
  useEffect(() => {
    // 외부 스크립트 불러오기 또는 초기화 로직
    const loadScripts = async () => {
      try {
        // 필요한 경우 여기에 외부 스크립트 로드 로직 추가
        console.log("스크립트 로드 완료");
      } catch (error) {
        console.error("스크립트 로드 오류:", error);
      }
    };

    loadScripts();

    // 프리로더 숨기기
    const hidePreloader = () => {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.style.display = "none";
      }
    };

    // 페이지 로드 후 프리로더 숨기기
    window.addEventListener("load", hidePreloader);
    // 백업: 페이지가 이미 로드된 경우
    if (document.readyState === "complete") {
      hidePreloader();
    }

    // 스크롤 이벤트 처리
    const handleScroll = () => {
      const backToTop = document.querySelector(".back-to-top");
      if (backToTop) {
        if (window.scrollY > 100) {
          backToTop.classList.add("active");
        } else {
          backToTop.classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 정리 함수
    return () => {
      window.removeEventListener("load", hidePreloader);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 맨 위로 스크롤 함수
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
        {/* 동적 콘텐츠를 위한 Outlet */}
        <Outlet />

        {/* About Section */}
        <section id="about" className="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 order-1 order-lg-2">
                <img src="/assets/img/about.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                <h3>
                  조은캠프만의 20여년간 축적된 온라인 강의 통합시스템 기술
                  노하우들을 고스란히 담았습니다.
                </h3>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Duis aute irure dolor
                    in reprehenderit in voluptate velit.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate trideta storacalaperda mastiro
                    dolore eu fugiat nulla pariatur.
                  </li>
                </ul>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Counts Section */}
        <section id="counts" className="counts section-bg">
          <div className="container">
            <div className="row counters">
              <div className="col-lg-3 col-6 text-center">
                <span className="purecounter">1232</span>
                <p>Students</p>
              </div>
              <div className="col-lg-3 col-6 text-center">
                <span className="purecounter">64</span>
                <p>Courses</p>
              </div>
              <div className="col-lg-3 col-6 text-center">
                <span className="purecounter">42</span>
                <p>Lecture Videos</p>
              </div>
              <div className="col-lg-3 col-6 text-center">
                <span className="purecounter">15</span>
                <p>Teachers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="why-us" className="why-us">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="content">
                  <h3>Why Choose JounCamp LMS ?</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Duis aute irure dolor in reprehenderit Asperiores
                    dolores sed et. Tenetur quia eos. Autem tempore quibusdam
                    vel necessitatibus optio ad corporis.
                  </p>
                  <div className="text-center">
                    <Link to="/about" className="more-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="icon-boxes d-flex flex-column justify-content-center">
                  <div className="row">
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-receipt"></i>
                        <h4>특별한 강의영상</h4>
                        <p>빠르고 깨끗한 교육강의 영상만을 준비합니다.</p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-cube-alt"></i>
                        <h4>차별화된 강의 시청화면</h4>
                        <p>
                          수강생의 온라인 강의학습에 최적화된 서비스를
                          제공합니다.
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-images"></i>
                        <h4>Prime Online LMS 서버 시스템</h4>
                        <p>
                          끊김없는 24시간 윈도우기반의 안정된 온라인 LMS
                          시스템을 제공합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <div className="icon-box">
                  <i className="ri-store-line" style={{ color: "#ffbb2c" }}></i>
                  <h3>
                    <Link to="">Lorem Ipsum</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                <div className="icon-box">
                  <i
                    className="ri-bar-chart-box-line"
                    style={{ color: "#5578ff" }}
                  ></i>
                  <h3>
                    <Link to="">Dolor Sitema</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                <div className="icon-box">
                  <i
                    className="ri-calendar-todo-line"
                    style={{ color: "#e80368" }}
                  ></i>
                  <h3>
                    <Link to="">Sed perspiciatis</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
                <div className="icon-box">
                  <i
                    className="ri-paint-brush-line"
                    style={{ color: "#e361ff" }}
                  ></i>
                  <h3>
                    <Link to="">Magni Dolores</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i
                    className="ri-database-2-line"
                    style={{ color: "#47aeff" }}
                  ></i>
                  <h3>
                    <Link to="">Nemo Enim</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i
                    className="ri-gradienter-line"
                    style={{ color: "#ffa76e" }}
                  ></i>
                  <h3>
                    <Link to="">Eiusmod Tempor</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i
                    className="ri-file-list-3-line"
                    style={{ color: "#11dbcf" }}
                  ></i>
                  <h3>
                    <Link to="">Midela Teren</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i
                    className="ri-price-tag-2-line"
                    style={{ color: "#4233ff" }}
                  ></i>
                  <h3>
                    <Link to="">Pira Neve</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i
                    className="ri-anchor-line"
                    style={{ color: "#b2904f" }}
                  ></i>
                  <h3>
                    <Link to="">Dirada Pack</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i className="ri-disc-line" style={{ color: "#b20969" }}></i>
                  <h3>
                    <Link to="">Moton Ideal</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i
                    className="ri-base-station-line"
                    style={{ color: "#ff5828" }}
                  ></i>
                  <h3>
                    <Link to="">Verdo Park</Link>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i
                    className="ri-fingerprint-line"
                    style={{ color: "#29cc61" }}
                  ></i>
                  <h3>
                    <Link to="">Flavor Nivelanda</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section id="popular-courses" className="courses">
          <div className="container">
            <div className="section-title">
              <h2>Courses</h2>
              <p>인기 강의영상</p>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="course-item">
                  <img
                    src="/assets/img/course-1.jpg"
                    className="img-fluid"
                    alt="..."
                  />
                  <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4>Web Development</h4>
                      <p className="price">$169</p>
                    </div>
                    <h3>
                      <Link to="/course-details">Website Design</Link>
                    </h3>
                    <p>
                      Et architecto provident deleniti facere repellat nobis
                      iste. Id facere quia quae dolores dolorem tempore.
                    </p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                      <div className="trainer-profile d-flex align-items-center">
                        <img
                          src="/assets/img/trainers/trainer-1.jpg"
                          className="img-fluid"
                          alt=""
                        />
                        <span>Antonio</span>
                      </div>
                      <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;50 &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;65
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="course-item">
                  <img
                    src="/assets/img/course-2.jpg"
                    className="img-fluid"
                    alt="..."
                  />
                  <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4>Marketing</h4>
                      <p className="price">$250</p>
                    </div>
                    <h3>
                      <Link to="/course-details">
                        Search Engine Optimization
                      </Link>
                    </h3>
                    <p>
                      Et architecto provident deleniti facere repellat nobis
                      iste. Id facere quia quae dolores dolorem tempore.
                    </p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                      <div className="trainer-profile d-flex align-items-center">
                        <img
                          src="/assets/img/trainers/trainer-2.jpg"
                          className="img-fluid"
                          alt=""
                        />
                        <span>Lana</span>
                      </div>
                      <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;35 &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;42
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                <div className="course-item">
                  <img
                    src="/assets/img/course-3.jpg"
                    className="img-fluid"
                    alt="..."
                  />
                  <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4>Content</h4>
                      <p className="price">$180</p>
                    </div>
                    <h3>
                      <Link to="/course-details">Copywriting</Link>
                    </h3>
                    <p>
                      Et architecto provident deleniti facere repellat nobis
                      iste. Id facere quia quae dolores dolorem tempore.
                    </p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                      <div className="trainer-profile d-flex align-items-center">
                        <img
                          src="/assets/img/trainers/trainer-3.jpg"
                          className="img-fluid"
                          alt=""
                        />
                        <span>Brandon</span>
                      </div>
                      <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;20 &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;85
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section id="trainers" className="trainers">
          <div className="container">
            <div className="section-title">
              <h2>Teachers</h2>
              <p>선생님</p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="member">
                  <img
                    src="/assets/img/trainers/trainer-1.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="member-content">
                    <h4>Walter White</h4>
                    <span>Web Development</span>
                    <p>
                      Magni qui quod omnis unde et eos fuga et exercitationem.
                      Odio veritatis perspiciatis quaerat qui aut aut aut
                    </p>
                    <div className="social">
                      <Link to="#">
                        <i className="bi bi-twitter"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-facebook"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-instagram"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="member">
                  <img
                    src="/assets/img/trainers/trainer-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="member-content">
                    <h4>Sarah Jhinson</h4>
                    <span>Marketing</span>
                    <p>
                      Repellat fugiat adipisci nemo illum nesciunt voluptas
                      repellendus. In architecto rerum rerum temporibus
                    </p>
                    <div className="social">
                      <Link to="#">
                        <i className="bi bi-twitter"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-facebook"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-instagram"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="member">
                  <img
                    src="/assets/img/trainers/trainer-3.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="member-content">
                    <h4>William Anderson</h4>
                    <span>Content</span>
                    <p>
                      Voluptas necessitatibus occaecati quia. Earum totam
                      consequuntur qui porro et laborum toro des clara
                    </p>
                    <div className="social">
                      <Link to="#">
                        <i className="bi bi-twitter"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-facebook"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-instagram"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer 컴포넌트 사용 */}
      <Footer />

      {/* 프리로더 */}
      <div id="preloader"></div>

      {/* Back to top button */}
      <button
        className="back-to-top d-flex align-items-center justify-content-center"
        onClick={scrollToTop}
      >
        <i className="bi bi-arrow-up-short"></i>
      </button>
    </>
  );
}

export default LayoutMain;
