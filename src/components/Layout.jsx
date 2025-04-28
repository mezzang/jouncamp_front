import { Outlet, Link } from "react-router-dom";
import Header from "./Header"; // 헤더 컴포넌트
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 불러오기
import "../styles/style.css"; // 추가 스타일 파일 불러오기

function Layout() {
  return (
    <>
      <Header isLoggedIn={false} /> {/* 로그인 상태 테스트용 */}
      {/* ======= Hero Section ======= */}
      <section
        id="hero"
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="container position-relative"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <h1>
            Learning Today,
            <br />
            Leading Tomorrow
          </h1>
          <h2>
            We are team of talented designers making websites with Bootstrap
          </h2>
          <a href="/courses" className="btn-get-started">
            Get Started
          </a>
        </div>
      </section>
      {/* ======= Main Section ======= */}
      <main id="main">
        <Outlet /> {/* 여기서 각 페이지(Home, Privacy 등)가 표시됨 */}
      </main>
      {/* ======= Footer Section ======= */}
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              {/* Footer 내용 복사 (간략화 버전) */}
              <div className="col-lg-3 col-md-6 footer-contact">
                <h3>JounCamp LMS</h3>
                <p>
                  A108 Adam Street
                  <br />
                  New York, NY 535022
                  <br />
                  United States
                </p>
              </div>
              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About us</Link>
                  </li>
                  <li>
                    <Link to="#">Services</Link>
                  </li>
                  <li>
                    <Link to="#">Terms of service</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy policy</Link>
                  </li>
                </ul>
              </div>
              {/* ... 나머지 Footer 부분도 필요하면 추가 가능 */}
            </div>
          </div>
        </div>

        <div className="container d-md-flex py-4">
          <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>JounCamp LMS</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">Designed by BootstrapMade</div>
          </div>
          <div className="social-links text-center text-md-right pt-3 pt-md-0">
            <a href="#" className="twitter">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#" className="facebook">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#" className="instagram">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#" className="linkedin">
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
