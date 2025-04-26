import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #f9faf9;
  color: #37423b;
  font-size: 14px;
  text-align: center;
`;

const FooterTop = styled.div`
  padding: 60px 0 30px 0;
  background: #f9f9f9;
`;

const FooterTopContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const FooterInfo = styled.div`
  margin-bottom: 30px;

  h3 {
    font-size: 24px;
    margin: 0 0 20px 0;
    padding: 2px 0 2px 0;
    line-height: 1;
    font-weight: 700;
  }

  p {
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 0;
    font-family: "Raleway", sans-serif;
    color: #777777;
  }
`;

const FooterLinks = styled.div`
  margin-bottom: 30px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #444444;
    position: relative;
    padding-bottom: 12px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px 0;
      display: flex;
      align-items: center;

      &:first-child {
        padding-top: 0;
      }

      i {
        padding-right: 2px;
        color: #5fcf80;
        font-size: 18px;
        line-height: 1;
      }

      a {
        color: #777777;
        transition: 0.3s;
        display: inline-block;
        line-height: 1;

        &:hover {
          color: #5fcf80;
        }
      }
    }
  }
`;

const FooterNewsletter = styled.div`
  margin-bottom: 30px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #444444;
    position: relative;
    padding-bottom: 12px;
  }

  p {
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 0;
    font-family: "Raleway", sans-serif;
    color: #777777;
  }

  form {
    margin-top: 30px;
    background: #fff;
    padding: 6px 10px;
    position: relative;
    border-radius: 50px;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.06);
    text-align: left;

    input[type="email"] {
      border: 0;
      padding: 4px 8px;
      width: calc(100% - 100px);
    }

    input[type="submit"] {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      border: 0;
      background: none;
      font-size: 16px;
      padding: 0 20px;
      background: #5fcf80;
      color: #fff;
      transition: 0.3s;
      border-radius: 50px;
      box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);

      &:hover {
        background: #3ac162;
      }
    }
  }
`;

const FooterBottom = styled.div`
  padding: 30px 0;
  border-top: 1px solid #e2e2e2;

  @media (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

const FooterBottomContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Copyright = styled.div`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 15px;
  }
`;

const Credits = styled.div`
  text-align: left;
  font-size: 13px;
  color: #777777;

  @media (max-width: 768px) {
    text-align: center;
  }

  a {
    color: #5fcf80;
  }
`;

const SocialLinks = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 15px;
  }

  a {
    font-size: 18px;
    display: inline-block;
    background: #5fcf80;
    color: #fff;
    line-height: 1;
    padding: 8px 0;
    margin-right: 4px;
    border-radius: 50%;
    text-align: center;
    width: 36px;
    height: 36px;
    transition: 0.3s;

    &:hover {
      background: #3ac162;
      color: #fff;
    }
  }
`;

const MainFooter = () => {
  return (
    <FooterContainer id="footer">
      <FooterTop className="footer-top">
        <FooterTopContent className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <FooterInfo>
                <h3>JounCamp LMS</h3>
                <p>
                  A108 Adam Street <br />
                  New York, NY 535022
                  <br />
                  United States <br />
                  <br />
                  <strong>Phone:</strong> +1 5589 55488 55
                  <br />
                  <strong>Email:</strong> info@example.com
                  <br />
                </p>
              </FooterInfo>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <FooterLinks>
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/about">About us</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/terms">Terms of service</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/privacy">Privacy policy</Link>
                  </li>
                </ul>
              </FooterLinks>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <FooterLinks>
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="#">Web Design</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="#">Web Development</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="#">Product Management</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="#">Marketing</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="#">Graphic Design</Link>
                  </li>
                </ul>
              </FooterLinks>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <FooterNewsletter>
                <h4>Join Our Newsletter</h4>
                <p>
                  Tamen quem nulla quae legam multos aute sint culpa legam
                  noster magna
                </p>
                <form action="" method="post">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </FooterNewsletter>
            </div>
          </div>
        </FooterTopContent>
      </FooterTop>

      <FooterBottom className="container d-md-flex py-4">
        <FooterBottomContent>
          <div className="me-md-auto text-center text-md-start">
            <Copyright className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>JounCamp LMS</span>
              </strong>
              . All Rights Reserved
            </Copyright>
            <Credits className="credits">
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </Credits>
          </div>
          <SocialLinks className="social-links text-center text-md-right pt-3 pt-md-0">
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
          </SocialLinks>
        </FooterBottomContent>
      </FooterBottom>
    </FooterContainer>
  );
};

export default MainFooter;
