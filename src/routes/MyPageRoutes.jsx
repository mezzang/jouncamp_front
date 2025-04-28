// src/routes/MyPageRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MyCourses from "../pages/MyPage/MyLectureList";
import MyLectureDetail from "../pages/MyPage/MyLectureDetail";
import VodPlayer from "../pages/MyPage/VodPlayer";

function MyPageRoutes() {
  return (
    <Routes>
      <Route path="/mypage/courses" element={<MyCourses orders={[]} />} />
      <Route
        path="/mypage/lecture/:id"
        element={<MyLectureDetail lecture={{}} vods={[]} />}
      />
      <Route path="/mypage/vod/:id" element={<VodPlayer vodInfo={{}} />} />
    </Routes>
  );
}

export default MyPageRoutes;
