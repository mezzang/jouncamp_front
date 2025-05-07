// src/components/Layout/LayoutMain.jsx
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/style.css"; // 스타일 경로는 프로젝트에 맞게 조정하세요.

import Header from "../Header"; // 공통 Header 컴포넌트 사용

function LayoutMain() {
  return (
    <>
      {/* Header */}
      <Header isLoggedIn={false} />

      {/* Hero Section */}
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

      {/* Main Body */}
      <main id="main">
        <Outlet />
      </main>

      {/* Footer */}
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-contact">
                <h3>JounCamp LMS</h3>
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

      {/* Back to top button */}
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}

export default LayoutMain;
