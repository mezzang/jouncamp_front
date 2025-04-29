import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

function DataList({
  gongList = [],
  dataList = [],
  totalRecord = 0,
  currentPage = 1,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchField, setSearchField] = useState("subject");
  const [searchQuery, setSearchQuery] = useState("");

  const isNew = (regDate) => {
    const now = new Date();
    const date = new Date(regDate);
    const diffMinutes = (now - date) / (1000 * 60);
    return diffMinutes < 7 * 1440;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("검색어를 입력해 주세요.");
      return;
    }
    navigate(`/data?SearchField=${searchField}&SearchQuery=${searchQuery}`);
  };

  const renderRow = (item, isNotice = false, index = 0) => {
    const cate = item.cate ? `[${item.cate}] ` : "";
    const downStr = item.filename1 ? (
      <a
        href={`/data/filedown/${item.no}/1`}
        dangerouslySetInnerHTML={{ __html: item.downStr }}
      />
    ) : (
      "-"
    );

    return (
      <tr key={item.no} style={isNotice ? { background: "#f5f5f5" } : {}}>
        <td>
          {isNotice ? "공지" : totalRecord - (currentPage - 1) * 10 - index}
        </td>
        <td
          style={{
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {cate}
          <a href={`/data/detail/${item.no}?Page=${currentPage}`}>
            {item.subject}
          </a>
          {isNew(item.regDate) && (
            <img
              src="/img/btn_new_red.gif"
              alt="new"
              style={{ marginLeft: 5 }}
            />
          )}
        </td>
        <td>{downStr}</td>
        <td>{dayjs(item.regDate).format("YYYY/MM/DD")}</td>
        <td>{item.readCnt.toLocaleString()}</td>
      </tr>
    );
  };

  return (
    <section className="course">
      <div className="container">
        <h2>자료실</h2>

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
            {gongList.map((item) => renderRow(item, true))}
            {dataList.map((item, idx) => renderRow(item, false, idx))}
          </tbody>
        </table>

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
          <button className="btn btn-secondary" style={{ marginLeft: "10px" }}>
            검색
          </button>
        </form>
      </div>
    </section>
  );
}

export default DataList;
