import { Routes, Route } from "react-router-dom";
import LayoutMain from "./components/Layout/LayoutMain";
import Layout from "./components/Layout/Layout";
import CoursesRoutes from "./routes/CoursesRoutes";
import MyPageRoutes from "./routes/MyPageRoutes";
import MemberRoutes from "./routes/MemberRoutes";
import NoticeRoutes from "./routes/NoticeRoutes";
import QnaRoutes from "./routes/QnaRoutes";
import DataRoutes from "./routes/DataRoutes";
import AboutRoutes from "./routes/AboutRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <AuthProvider>
      <Routes>
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
          <Route
            path="mypage/*"
            element={
              <ProtectedRoute>
                <MyPageRoutes />
              </ProtectedRoute>
            }
          />
          <Route path="courses/*" element={<CoursesRoutes />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
