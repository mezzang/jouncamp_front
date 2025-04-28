// src/pages/notice/NoticeDetail.jsx
import { useNavigate } from "react-router-dom";

function NoticeDetail({ notice }) {
  const navigate = useNavigate();

  const {
    subject,
    content,
    name,
    readCount,
    regDate,
    gong,
    files = [],
  } = notice;

  return (
    <section className="course">
      <div className="container">
        <div className="col-lg-12 col-md-12 align-items-stretch">
          <div className="col-md">
            <div className="card">
              <div className="card-header">
                <h4
                  className="card-title"
                  style={{ paddingLeft: "20px", paddingTop: "10px" }}
                >
                  공지사항
                </h4>
              </div>
              <div
                className="card-body"
                style={{ padding: "20px 35px 20px 50px" }}
              >
                <div style={{ fontSize: "1.5em", color: "cadetblue" }}>
                  {gong === "y" && (
                    <span style={{ color: "red" }}>[공지글]</span>
                  )}{" "}
                  {subject}
                </div>
                <div style={{ textAlign: "right" }}>
                  <span>글쓴이: {name}</span>
                  <span style={{ marginLeft: "14px" }}>
                    조회수: {readCount.toLocaleString()}
                  </span>
                  <span style={{ marginLeft: "14px" }}>등록일: {regDate}</span>
                </div>
                <p
                  style={{ color: "#2f4f4f", paddingTop: "20px" }}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>

              {files.length > 0 && (
                <div className="card-footer" style={{ border: 0 }}>
                  <ul className="list-group" style={{ border: 0 }}>
                    {files.map((file, idx) => (
                      <li
                        key={idx}
                        className="list-group-item"
                        style={{ border: 0 }}
                      >
                        <span>{file}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-2" style={{ justifyContent: "center" }}>
          <div className="col-md-10 text-center">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              목록
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoticeDetail;
