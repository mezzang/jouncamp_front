import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function DataDetail({ dataItem, fileStrs }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("Page")) || 1;
  const searchField = searchParams.get("SearchField") || "subject";
  const searchQuery = searchParams.get("SearchQuery") || "";

  const contentHtml = dataItem.content?.replace(/\r\n/g, "<br />") || "";
  const isNotice = dataItem.gong === "y";
  const category = dataItem.cate || "전체";

  const handleBack = () => {
    navigate(
      `/data?page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`
    );
  };

  return (
    <section className="course">
      <div className="breadcrumbs">
        <div className="container">
          <h2>자료실</h2>
          <p>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem...
          </p>
        </div>
      </div>

      <div className="container">
        <div className="col-md">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title" style={{ padding: "20px" }}>
                <i className="nc-icon nc-paper"></i> 자료실
              </h4>
            </div>

            <div
              className="card-body"
              style={{ padding: "20px 35px 20px 50px" }}
            >
              <div style={{ fontSize: "1.5em", color: "cadetblue" }}>
                {isNotice && <span style={{ color: "red" }}>[공지글]</span>}{" "}
                {dataItem.subject}
              </div>
              <div style={{ textAlign: "right" }}>
                <span>글쓴이 : {dataItem.name}</span>
                <span style={{ marginLeft: "14px" }}>
                  조회수 : {dataItem.readCnt?.toLocaleString()}
                </span>
                <span style={{ marginLeft: "14px" }}>
                  등록일 : {new Date(dataItem.regDate).toLocaleDateString()}
                </span>
              </div>
              <p
                style={{ color: "#2f4f4f", paddingTop: 20 }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              ></p>
            </div>

            {(dataItem.filename1 ||
              dataItem.filename2 ||
              dataItem.filename3) && (
              <div className="card-footer" style={{ border: 0 }}>
                <ul className="list-group" style={{ border: 0 }}>
                  {fileStrs?.map(
                    (str, idx) =>
                      str && (
                        <li
                          key={idx}
                          className="list-group-item"
                          style={{ border: 0 }}
                          dangerouslySetInnerHTML={{ __html: str }}
                        ></li>
                      )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="row mt-2" style={{ justifyContent: "center" }}>
          <div className="col-md-10 text-center">
            <button className="btn btn-secondary" onClick={handleBack}>
              목록
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataDetail;
