import { Routes, Route } from "react-router-dom";
import LayoutMain from "./components/Layout/LayoutMain";
import Layout from "./components/Layout/Layout";
import LayoutBasic from "./components/Layout/LayoutBasic";

// 각각의 기능별 라우트 모듈 import
import CoursesRoutes from "./routes/CoursesRoutes";
import MyPageRoutes from "./routes/MyPageRoutes";
import MemberRoutes from "./routes/MemberRoutes";
import NoticeRoutes from "./routes/NoticeRoutes";
import QnaRoutes from "./routes/QnaRoutes";
import DataRoutes from "./routes/DataRoutes";
import AboutRoutes from "./routes/AboutRoutes";

import Home from "./pages/Home"; // 메인 홈 화면
import Privacy from "./pages/Privacy"; // 개인정보 처리방침

function App() {
  return (
    <Routes>
      {/* route가 자식 컴포넌트로 중첩되어 있다. */}
      {/* 메인/소개용 LayoutMain */}
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Home />} />

        <Route path="privacy" element={<Privacy />} />
      </Route>

      {/* 커뮤니티, 자료실 Layout */}
      <Route element={<Layout />}>
        <Route path="about/*" element={<AboutRoutes />} />
        <Route path="notice/*" element={<NoticeRoutes />} />
        <Route path="qna/*" element={<QnaRoutes />} />
        <Route path="data/*" element={<DataRoutes />} />
        <Route path="member/*" element={<MemberRoutes />} />
      </Route>

      {/* 로그인/회원/내강의실 LayoutBasic */}
      <Route element={<LayoutBasic />}>
        <Route path="courses/*" element={<CoursesRoutes />} />
        <Route path="mypage/*" element={<MyPageRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
