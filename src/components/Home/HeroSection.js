import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeroContainer = styled.section`
  width: 100%;
  height: 80vh;
  background: url("/assets/img/hero-bg.jpg") top center;
  background-size: cover;
  position: relative;

  &:before {
    content: "";
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }

  @media (min-width: 1024px) {
    background-attachment: fixed;
  }
`;

const HeroContent = styled.div`
  position: relative;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 48px;
    font-weight: 700;
    line-height: 56px;
    color: #fff;
    font-family: "Poppins", sans-serif;

    @media (max-width: 991px) {
      font-size: 28px;
      line-height: 36px;
    }
  }

  h2 {
    color: #eee;
    margin: 10px 0 0 0;
    font-size: 24px;

    @media (max-width: 991px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
`;

const GetStartedButton = styled(Link)`
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 10px 35px;
  border-radius: 50px;
  transition: 0.5s;
  margin-top: 30px;
  border: 2px solid #fff;
  color: #fff;

  &:hover {
    background: #5fcf80;
    border: 2px solid #5fcf80;
    color: #fff;
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer
      id="hero"
      className="d-flex justify-content-center align-items-center"
    >
      <HeroContent
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
        <GetStartedButton to="/courses" className="btn-get-started">
          Get Started
        </GetStartedButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
