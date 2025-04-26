import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

// 메인 콘텐츠 영역 스타일
const MainContainer = styled.div`
  min-height: calc(100vh - 160px); // 헤더와 푸터를 제외한 최소 높이
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Main = styled.main`
  padding-bottom: 3rem;
`;

const Layout = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Container>
          <Main role="main">
            <Outlet />
          </Main>
        </Container>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Layout;
