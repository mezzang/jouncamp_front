// src/routes/QnaRoutes.jsx
import { Routes, Route } from "react-router-dom";
import QnaList from "../pages/Qna/QnaList";
import QnaDetail from "../pages/Qna/QnaDetail";
import QnaWrite from "../pages/Qna/QnaWrite";
import QnaEdit from "../pages/Qna/QnaEdit";
import QnaReply from "../pages/Qna/QnaReply";

function QnaRoutes() {
  return (
    <Routes>
      <Route path="/" element={<QnaList />} />
      {/* /qna → QnA 리스트 페이지 */}

      <Route path="detail/:id" element={<QnaDetail />} />
      {/* /qna/detail/:id → QnA 상세 페이지 */}

      <Route path="write" element={<QnaWrite />} />
      {/* /qna/write → 질문글 작성 페이지 */}

      <Route path="edit/:id" element={<QnaEdit />} />
      {/* /qna/mod/:id → 질문글 수정 페이지 */}

      <Route path="reply/:id" element={<QnaReply />} />
      {/* /qna/reply/:id → 답변 작성 페이지 */}
    </Routes>
  );
}

export default QnaRoutes;
