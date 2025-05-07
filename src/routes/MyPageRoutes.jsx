import { Routes, Route } from "react-router-dom";
import MyLectureList from "../pages/MyPage/MyLectureList";
import MyLectureDetail from "../pages/MyPage/MyLectureDetail";
import VodPlayer from "../pages/MyPage/VodPlayer";

function MyPageRoutes() {
  return (
    <Routes>
      {/* 기본 내 강의실 페이지 */}
      <Route path="/" element={<MyLectureList />} />

      {/* 강의 상세 페이지 */}
      <Route path="/lecture/:id" element={<MyLectureDetail />} />

      {/* VOD 플레이어 페이지 */}
      <Route path="/vod/:id" element={<VodPlayer />} />
    </Routes>
  );
}

export default MyPageRoutes;
