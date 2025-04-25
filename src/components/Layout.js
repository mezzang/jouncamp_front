import React from "react";
import styled from "styled-components";
import { Outlet, Link, useLocation } from "react-router-dom";

// 스타일 컴포넌트 정의
const Header = styled.header`
  // 헤더 스타일
`;

const Footer = styled.footer`
  // 푸터 스타일
`;

// _Layout.cshtml을 대체하는 컴포넌트
const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Header>
        {/* 네비게이션 메뉴 */}
        <nav>
          <Link to="/">홈</Link>
          <Link to="/courses">교과과정</Link>
          <Link to="/about">소개</Link>
          <Link to="/contact">오시는 길</Link>
          {/* 추가 메뉴 */}
        </nav>
      </Header>

      <main>
        {/* 각 페이지 컴포넌트가 이 위치에 렌더링됨 */}
        <Outlet />
      </main>

      <Footer>
        {/* 푸터 내용 */}
        <p>
          &copy; {new Date().getFullYear()} 조은캠프 LMS. All rights reserved.
        </p>
      </Footer>
    </>
  );
};

export default Layout;
