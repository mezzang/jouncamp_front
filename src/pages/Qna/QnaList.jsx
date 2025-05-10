// src/pages/Qna/QnaList.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

function QnaList({
  qnaList = [],
  totalRecord = 0,
  currentPage = 1,
  isLoggedIn,
}) {
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("subject");
  const [searchQuery, setSearchQuery] = useState("");

  const today = new Date();

  const isNew = (regDate) => {
    const gap = (today - new Date(regDate)) / (1000 * 60); // 분 차이
    return gap < 7 * 1440;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("검색어를 입력해 주세요.");
      return;
    }
    navigate(`/qna?SearchField=${searchField}&SearchQuery=${searchQuery}`);
  };

  return (
    <>
      <Breadcrumbs title="QnA" description="JounCamp LMS QnA 게시판 입니다." />

      <section className="course">
        <div className="container">
          <h2>질문과 답변</h2>

          <table className="table" style={{ width: "95%", margin: "0 auto" }}>
            <thead className="text-primary text-center">
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>첨부파일</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {qnaList.length === 0 ? (
                <tr>
                  <td colSpan="5">등록된 게시글이 없습니다.</td>
                </tr>
              ) : (
                qnaList.map((qna, idx) => {
                  const replyIndent =
                    qna.tdepth > 0 ? (
                      <>
                        {"\u00A0\u00A0".repeat(qna.tdepth)}
                        <img src="/img/btn_reply.gif" alt="reply" />
                        &nbsp;
                      </>
                    ) : null;

                  const fileDownload = qna.filename1 ? (
                    <a
                      href={`/qna/filedown/${qna.no}/1`}
                      dangerouslySetInnerHTML={{ __html: qna.downStr }}
                    />
                  ) : (
                    "-"
                  );

                  return (
                    <tr key={qna.no}>
                      <td>{totalRecord - (currentPage - 1) * 10 - idx}</td>
                      <td
                        style={{
                          textAlign: "left",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {replyIndent}
                        <a href={`/qna/detail/${qna.no}`}>{qna.subject}</a>
                        {isNew(qna.regDate) && (
                          <img
                            src="/img/btn_new_red.gif"
                            alt="new"
                            style={{ marginLeft: "5px" }}
                          />
                        )}
                      </td>
                      <td>{fileDownload}</td>
                      <td>{new Date(qna.regDate).toLocaleDateString()}</td>
                      <td>{qna.readCnt.toLocaleString()}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* 검색 */}
          <form
            onSubmit={handleSearch}
            className="form-inline mt-4 d-flex justify-content-center"
          >
            <select
              className="form-control"
              style={{ width: "90px" }}
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            >
              <option value="subject">제목</option>
              <option value="content">내용</option>
            </select>
            <input
              type="text"
              className="form-control"
              style={{ width: "200px", marginLeft: "10px" }}
              placeholder="검색어를 입력해 주세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-secondary"
              style={{ marginLeft: "10px" }}
            >
              검색
            </button>
          </form>

          {/* 하단 버튼 영역 */}
          <div className="row my-5 justify-content-center">
            {isLoggedIn && (
              <div className="col-md-2 text-end">
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/qna/write")}
                >
                  글쓰기
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default QnaList;
