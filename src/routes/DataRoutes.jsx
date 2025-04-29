// src/routes/DataRoutes.jsx
import { Routes, Route } from "react-router-dom";
import DataList from "../pages/Data/DataList"; // 목록
import DataDetail from "../pages/Data/DataDetail"; // 상세

function DataRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DataList />} />
      {/* /data → 자료실 목록 */}
      <Route path="detail/:id" element={<DataDetail />} />
      {/* /data/detail/:id → 자료실 상세페이지 */}
    </Routes>
  );
}

export default DataRoutes;
