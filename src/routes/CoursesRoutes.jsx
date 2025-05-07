// src/routes/CoursesRoutes.jsx
import { Routes, Route } from "react-router-dom";
import CourseList from "../pages/Courses/CourseList";
import CourseDetail from "../pages/Courses/CourseDetail";
import Enrollment from "../pages/Courses/Enrollment";

function CoursesRoutes() {
  return (
    <Routes>
      <Route path="/courses" element={<CourseList lectures={[]} />} />
      <Route
        path="/courses/detail/:id"
        element={
          <CourseDetail lecture={{}} vods={[]} isLoggedIn={true} message={""} />
        }
      />
      <Route
        path="/courses/enrollment/:id"
        element={<Enrollment lecture={{}} isLoggedIn={true} />}
      />
    </Routes>
  );
}

export default CoursesRoutes;
