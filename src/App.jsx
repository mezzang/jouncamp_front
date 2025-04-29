import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // 공통 레이아웃

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
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* 메인 홈 */}
        <Route path="privacy" element={<Privacy />} /> {/* 개인정보처리방침 */}
        <Route path="courses/*" element={<CoursesRoutes />} /> {/* 강의실 */}
        <Route path="mypage/*" element={<MyPageRoutes />} /> {/* 마이페이지 */}
        <Route path="member/*" element={<MemberRoutes />} /> {/* 회원 */}
        <Route path="notice/*" element={<NoticeRoutes />} /> {/* 공지사항 */}
        <Route path="qna/*" element={<QnaRoutes />} /> {/* Q&A */}
        <Route path="data/*" element={<DataRoutes />} /> {/* 자료실 */}
        <Route path="about/*" element={<AboutRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
