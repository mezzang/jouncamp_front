import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import theme from "./styles/theme";
import Layout from "./components/Layout";

// 페이지 컴포넌트 임포트
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Privacy from "./pages/Privacy";
import CoursesList from "./pages/Courses/CoursesList";
import CourseDetails from "./pages/Courses/CourseDetails";
import CourseEnrollment from "./pages/Courses/CourseEnrollment";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 정적 페이지 */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* 강의 관련 페이지 */}
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/courses/detail/:id" element={<CourseDetails />} />
            <Route
              path="/courses/enrollment/:id"
              element={<CourseEnrollment />}
            />
            <Route path="/data/detail/:id" element={<DataDetail />} />
            <Route path="/data" element={<DataList />} />
            <Route path="/data/index" element={<DataList />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/member/login" element={<Login />} />
            <Route path="/member/register" element={<Register />} />
            <Route
              path="/mypage/course/:orderCode"
              element={<CourseDetail />}
            />
            <Route path="/mypage" element={<MyCourses />} />
            <Route path="/mypage/index" element={<MyCourses />} />
            <Route path="/mypage/vodplayer/:vodNo" element={<VodPlayer />} />
            <Route path="/notice/detail/:id" element={<NoticeDetail />} />
            <Route path="/notice" element={<NoticeList />} />
            <Route path="/notice/index" element={<NoticeList />} />
            <Route path="/notice/write" element={<NoticeWrite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
