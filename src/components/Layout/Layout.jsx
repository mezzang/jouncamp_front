// src/components/Layout/Layout.jsx
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/style.css"; // 프로젝트 스타일 경로에 맞게 조정하세요.
import Header from "../Header"; // 공통 헤더 컴포넌트

function Layout() {
  return (
    <>
      {/* Header */}
      <Header isLoggedIn={false} />

      {/* 메인 섹션 */}
      <main id="main" data-aos="fade-in">
        <Outlet /> {/* 페이지 콘텐츠 표시 */}
      </main>

      {/* Footer */}
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              {/* Footer Contact */}
              <div className="col-lg-3 col-md-6 footer-contact">
                <h3>조은캠프 LMS</h3>
                <p>
                  A108 Adam Street
                  <br />
                  New York, NY 535022
                  <br />
                  United States
                  <br />
                  <br />
                  <strong>Phone:</strong> +1 5589 55488 55
                  <br />
                  <strong>Email:</strong> info@example.com
                  <br />
                </p>
              </div>

              {/* Useful Links */}
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

              {/* Our Services */}
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <Link to="#">Web Design</Link>
                  </li>
                  <li>
                    <Link to="#">Web Development</Link>
                  </li>
                  <li>
                    <Link to="#">Product Management</Link>
                  </li>
                  <li>
                    <Link to="#">Marketing</Link>
                  </li>
                  <li>
                    <Link to="#">Graphic Design</Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Join Our Newsletter</h4>
                <p>
                  Tamen quem nulla quae legam multos aute sint culpa legam
                  noster magna
                </p>
                <form>
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="container d-md-flex py-4">
          <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>JounCamp LMS</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
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
            <a href="#" className="google-plus">
              <i className="bx bxl-skype"></i>
            </a>
            <a href="#" className="linkedin">
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}

export default Layout;
