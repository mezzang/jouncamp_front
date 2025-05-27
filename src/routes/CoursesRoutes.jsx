// src/routes/CoursesRoutes.jsx
import { Routes, Route } from "react-router-dom";
import CourseList from "../pages/Courses/CourseList";
import CourseDetail from "../pages/Courses/CourseDetail";
import Enrollment from "../pages/Courses/Enrollment";

function CoursesRoutes() {
  return (
    <Routes>
      {/* /courses → 강의 목록 */}
      <Route index element={<CourseList />} />

      {/* /courses/detail/:id → 강의 상세 */}
      <Route path="detail/:id" element={<CourseDetail />} />

      {/* /courses/enrollment/:id → 수강 신청 */}
      <Route path="enrollment/:id" element={<Enrollment />} />
    </Routes>
  );
}

export default CoursesRoutes;
