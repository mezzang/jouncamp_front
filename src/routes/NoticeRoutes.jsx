// src/routes/NoticeRoutes.jsx
import { Routes, Route } from "react-router-dom";
import NoticeList from "../pages/Notice/NoticeList";
import NoticeDetail from "../pages/Notice/NoticeDetail";
import NoticeWrite from "../pages/Notice/NoticeWrite";

function NoticeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NoticeList />} />
      {/* /notice → 공지사항 리스트 */}
      <Route path="detail/:id" element={<NoticeDetail />} />
      {/* /notice/detail/:id → 공지사항 상세 페이지 */}
      <Route path="write" element={<NoticeWrite />} />
      {/* /notice/write → 공지사항 작성 페이지 */}
    </Routes>
  );
}

export default NoticeRoutes;
