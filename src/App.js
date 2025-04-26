import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import theme from "./styles/theme";
import Layout from "./components/Layout";

// 홈페이지
import HomePage from "./pages/Home/HomePage";

// About 페이지
import About from "./pages/About/About";
import Privacy from "./pages/About/Privacy";
import ContactUs from "./pages/About/ContactUs";

// 강의 관련 페이지
import CoursesList from "./pages/Courses/CoursesList";
import CourseDetails from "./pages/Courses/CourseDetails";
import CourseEnrollment from "./pages/Courses/CourseEnrollment";

// 회원 관련 페이지
import Login from "./pages/Member/Login";
import Register from "./pages/Member/Register";

// 마이페이지 관련
import MyCourses from "./pages/Mypage/MyCourses";
import CourseDetail from "./pages/Mypage/CourseDetail";
import VodPlayer from "./pages/Mypage/VodPlayer";

// 공지사항 관련
import NoticeList from "./pages/Notice/NoticeList";
import NoticeDetail from "./pages/Notice/NoticeDetail";
import NoticeWrite from "./pages/Notice/NoticeWrite";

// Q&A 관련
import QnaList from "./pages/Qna/QnaList";
import QnaDetail from "./pages/Qna/QnaDetail";
import QnaWrite from "./pages/Qna/QnaWrite";
import QnaModify from "./pages/Qna/QnaModify";
import QnaReply from "./pages/Qna/QnaReply";

// 자료실 관련
import DataList from "./pages/Data/DataList";
import DataDetail from "./pages/Data/DataDetail";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            {/* 메인 페이지는 특별한 레이아웃 사용 */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>

            {/* 다른 페이지들은 기본 레이아웃 사용 */}
            <Route path="/" element={<Layout />}>
              {/* 홈페이지 */}
              <Route index element={<HomePage />} />
              {/* About 페이지 */}
              <Route path="/about" element={<About />} />
              <Route path="/about/privacy" element={<Privacy />} />
              <Route path="/about/contact" element={<ContactUs />} />{" "}
              {/* 강의 관련 페이지 */}
              <Route path="/courses" element={<CoursesList />} />
              <Route path="/courses/detail/:id" element={<CourseDetails />} />
              <Route
                path="/courses/enrollment/:id"
                element={<CourseEnrollment />}
              />
              {/* 회원 관련 페이지 */}
              <Route path="/member/login" element={<Login />} />
              <Route path="/member/register" element={<Register />} />
              {/* 마이페이지 관련 */}
              <Route path="/mypage" element={<MyCourses />} />
              <Route path="/mypage/index" element={<MyCourses />} />
              <Route
                path="/mypage/detail/:orderCode"
                element={<CourseDetail />}
              />
              <Route path="/mypage/vodplayer/:vodNo" element={<VodPlayer />} />
              {/* 공지사항 관련 */}
              <Route path="/notice" element={<NoticeList />} />
              <Route path="/notice/index" element={<NoticeList />} />
              <Route path="/notice/detail/:id" element={<NoticeDetail />} />
              <Route path="/notice/write" element={<NoticeWrite />} />
              {/* Q&A 관련 */}
              <Route path="/qna" element={<QnaList />} />
              <Route path="/qna/index" element={<QnaList />} />
              <Route path="/qna/detail/:id" element={<QnaDetail />} />
              <Route path="/qna/write" element={<QnaWrite />} />
              <Route path="/qna/mod/:id" element={<QnaModify />} />
              <Route path="/qna/reply/:id" element={<QnaReply />} />
              {/* 자료실 관련 */}
              <Route path="/data" element={<DataList />} />
              <Route path="/data/index" element={<DataList />} />
              <Route path="/data/detail/:id" element={<DataDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
