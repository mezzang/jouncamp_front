import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // 공통 레이아웃

// 각각의 기능별 라우트 모듈 import
import CoursesRoutes from "./routes/CoursesRoutes";
import MyPageRoutes from "./routes/MyPageRoutes";
import MemberRoutes from "./routes/MemberRoutes";
import NoticeRoutes from "./routes/NoticeRoutes";
import QnaRoutes from "./routes/QnaRoutes"; // 추가!

import Home from "./pages/Home"; // 메인 홈 화면
import Privacy from "./pages/Privacy"; // 개인정보 처리방침

function App() {
  return (
    <Routes>
      {/* Layout으로 감싸진 기본 구조 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* 메인 홈 */}
        <Route path="privacy" element={<Privacy />} /> {/* 개인정보처리방침 */}
        {/* Courses 기능 */}
        <Route path="courses/*" element={<CoursesRoutes />} />
        {/* MyPage 기능 (내 강의실) */}
        <Route path="mypage/*" element={<MyPageRoutes />} />
        {/* Member 기능 (로그인, 회원가입) */}
        <Route path="member/*" element={<MemberRoutes />} />
        {/* Notice 기능 (공지사항) */}
        <Route path="notice/*" element={<NoticeRoutes />} />
        {/* QnA 기능 (질문과 답변) */}
        <Route path="qna/*" element={<QnaRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
