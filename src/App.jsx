import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Layout.jsx 불러오기
import Home from "./pages/Home"; // Home 페이지
import Privacy from "./pages/Privacy"; // Privacy 페이지

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Layout 안에 들어가는 Outlet 영역 */}
        <Route index element={<Home />} /> {/* / 경로 = Home 페이지 */}
        <Route path="privacy" element={<Privacy />} />{" "}
        {/* /privacy 경로 = Privacy 페이지 */}
        {/* 필요하면 여기에 추가 페이지 연결 가능 */}
      </Route>
    </Routes>
  );
}

export default App;
