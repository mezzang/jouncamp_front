import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./MainFooter";
import HeroSection from "../Home/HeroSection";
import AboutSection from "../Home/AboutSection";
import CountsSection from "../Home/CountsSection";
import WhyUsSection from "../Home/WhyUsSection";
import FeaturesSection from "../Home/FeaturesSection";
import PopularCoursesSection from "../Home/PopularCoursesSection";
import TrainersSection from "../Home/TrainersSection";

// 스타일 컴포넌트
const Main = styled.main`
  overflow: hidden;
`;

// 백투탑 버튼
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

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 페이지 로딩 완료 시 프리로더 숨기기
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader loading={loading} id="preloader" />
      <Header />
      <HeroSection />
      <Main id="main">
        <Outlet />
        <AboutSection />
        <CountsSection />
        <WhyUsSection />
        <FeaturesSection />
        <PopularCoursesSection />
        <TrainersSection />
      </Main>
      <Footer />
      <BackToTop
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </BackToTop>
    </>
  );
};

export default MainLayout;
