// src/pages/Qna/QnaDetail.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function QnaDetail({ qna, currentUserId }) {
  const navigate = useNavigate();
  const { id } = useParams(); // URL 파라미터로 qna ID 가져오기

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      navigate(`/qna/del/${id}`);
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <h2>질문과 답변</h2>
          <p>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="course">
        <div className="container">
          <div className="col-lg-12 col-md-12 align-items-stretch">
            <div className="card">
              <div className="card-header">
                <h4
                  className="card-title"
                  style={{ paddingLeft: "20px", paddingTop: "10px" }}
                >
                  <i
                    className="nc-icon nc-paper"
                    style={{ paddingTop: "20px" }}
                  ></i>{" "}
                  질문과 답변
                </h4>
              </div>
              <div
                className="card-body"
                style={{ padding: "20px 35px 20px 50px" }}
              >
                <div style={{ fontSize: "1.5em", color: "cadetblue" }}>
                  {qna.subject}
                </div>
                <div style={{ textAlign: "right" }}>
                  <span>글쓴이: {qna.name}</span>
                  <span style={{ marginLeft: "14px" }}>
                    조회수: {qna.readCnt.toLocaleString()}
                  </span>
                  <span style={{ marginLeft: "14px" }}>
                    등록일: {new Date(qna.regDate).toLocaleDateString()}
                  </span>
                </div>
                <p
                  style={{ color: "#2f4f4f", paddingTop: "20px" }}
                  dangerouslySetInnerHTML={{ __html: qna.content }}
                />
              </div>

              {/* 첨부파일 */}
              {(qna.filename1 || qna.filename2 || qna.filename3) && (
                <div className="card-footer" style={{ border: 0 }}>
                  <ul className="list-group" style={{ border: 0 }}>
                    {qna.filename1 && (
                      <li className="list-group-item" style={{ border: 0 }}>
                        <a
                          href={qna.fileUrl1}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {qna.filename1}
                        </a>
                      </li>
                    )}
                    {qna.filename2 && (
                      <li className="list-group-item" style={{ border: 0 }}>
                        <a
                          href={qna.fileUrl2}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {qna.filename2}
                        </a>
                      </li>
                    )}
                    {qna.filename3 && (
                      <li className="list-group-item" style={{ border: 0 }}>
                        <a
                          href={qna.fileUrl3}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {qna.filename3}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="row mt-2" style={{ justifyContent: "center" }}>
            <div className="col-md-10 text-center">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/qna/write")}
              >
                글쓰기
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate(`/qna/reply/${id}`)}
              >
                답변쓰기
              </button>
              {currentUserId && currentUserId === qna.memberId && (
                <>
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/qna/mod/${id}`)}
                  >
                    수정
                  </button>
                  <button className="btn btn-secondary" onClick={handleDelete}>
                    삭제
                  </button>
                </>
              )}
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/qna")}
              >
                목록
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default QnaDetail;
