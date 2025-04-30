import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs"; // 경로 맞게 조정

function NoticeList({
  gongList = [],
  noticeList = [],
  totalRecord = 0,
  currentPage = 1,
}) {
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("subject");
  const [searchQuery, setSearchQuery] = useState("");

  const today = new Date();

  const isNew = (regDate) => {
    const gap = (today - new Date(regDate)) / (1000 * 60);
    return gap < 7 * 1440;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("검색어를 입력해 주세요.");
      return;
    }
    navigate(`/notice?SearchField=${searchField}&SearchQuery=${searchQuery}`);
  };

  return (
    <>
      <Breadcrumbs
        title="공지사항"
        description="학교 및 조은캠프의 주요 안내 사항을 확인해보세요."
      />

      <section className="course">
        <div className="container">
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
              {gongList.map((notice, idx) => (
                <tr key={`gong-${idx}`} style={{ background: "#f5f5f5" }}>
                  <td>공지</td>
                  <td style={{ textAlign: "left" }}>
                    [{notice.cate}]{" "}
                    <a href={`/notice/${notice.no}`}>{notice.subject}</a>
                    {isNew(notice.regDate) && (
                      <img src="/img/btn_new_red.gif" alt="new" />
                    )}
                  </td>
                  <td dangerouslySetInnerHTML={{ __html: notice.downStr }} />
                  <td>{notice.regDate}</td>
                  <td>{notice.readCnt.toLocaleString()}</td>
                </tr>
              ))}
              {noticeList.map((notice, idx) => (
                <tr key={`notice-${idx}`}>
                  <td>{totalRecord - (currentPage - 1) * 10 - idx}</td>
                  <td style={{ textAlign: "left" }}>
                    [{notice.cate}]{" "}
                    <a href={`/notice/${notice.no}`}>{notice.subject}</a>
                    {isNew(notice.regDate) && (
                      <img src="/img/btn_new_red.gif" alt="new" />
                    )}
                  </td>
                  <td dangerouslySetInnerHTML={{ __html: notice.downStr }} />
                  <td>{notice.regDate}</td>
                  <td>{notice.readCnt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 검색창 */}
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
              placeholder="검색어를 입력해 주세요"
              style={{ width: "200px", marginLeft: "10px" }}
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
        </div>
      </section>
    </>
  );
}

export default NoticeList;
