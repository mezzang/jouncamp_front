import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMyCourses } from "../../services/mypageService";

function MyLectureList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]); // JcOrder 모델과 일치하도록 변수명 변경
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  // 쿼리스트링 파싱 (ASP.NET MVC와 일치하도록)
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("Page")) || 1;
  const searchField = queryParams.get("SearchField") || "";
  const searchQuery = queryParams.get("SearchQuery") || "";
  const itemsPerPage = 10; // 페이지당 항목 수

  useEffect(() => {
    async function fetchOrders() {
      try {
        // API 호출 시 searchField와 searchQuery도 전달
        const data = await getMyCourses(page, searchField, searchQuery);
        setOrders(data.orders);
        setTotalRecords(data.totalRecords);
      } catch (error) {
        console.error("내 강의실 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [page, searchField, searchQuery]);

  // 번호 계산 로직 (ASP.NET MVC와 동일하게)
  const calculateNumber = (index) => {
    return totalRecords - itemsPerPage * (page - 1) - index;
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (orders.length === 0) {
    return <div>수강중인 강의가 없습니다.</div>;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <h2>내 강의실</h2>
          <p>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
          </p>
        </div>
      </div>

      {/* Courses Section */}
      <section id="cource-details-tabs" className="cource-details-tabs mt-4">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
            <div className="container-fluid" style={{ background: "#fff" }}>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo01"
              >
                <a
                  className="navbar-brand"
                  href="#"
                  style={{ fontWeight: "bold" }}
                >
                  현재 교과과정
                </a>
              </div>
            </div>
          </nav>

          <div className="row">
            <table className="table table-hover table-bordered">
              <thead>
                <tr className="text-center">
                  <th style={{ padding: "5px" }}>번호</th>
                  <th style={{ padding: "5px" }}>교과과정</th>
                  <th style={{ padding: "5px" }}>강의기간</th>
                  <th style={{ padding: "5px" }}>수강료</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  // 카테고리 문자열 구성 (ASP.NET MVC와 동일한 로직)
                  let cateStr = "";
                  if (order.jcLecture?.catename1) {
                    cateStr += order.jcLecture.catename1;
                  }
                  if (order.jcLecture?.catename2) {
                    cateStr += " > " + order.jcLecture.catename2;
                  }

                  // 가격 문자열 구성 (ASP.NET MVC와 동일한 로직)
                  let priceStr;
                  if (order.price > 0) {
                    priceStr = `${order.price.toLocaleString()}원`;
                  } else {
                    priceStr = (
                      <span style={{ color: "#d2a573" }}>무료강의</span>
                    );
                  }

                  // 번호 계산
                  const num = calculateNumber(index);

                  return (
                    <tr
                      key={order.no}
                      className="course-row"
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f5f5f5")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "")
                      }
                      onClick={() =>
                        navigate(
                          `/Mypage/Detail/${order.no}?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`
                        )
                      }
                    >
                      <td className="text-center" style={{ padding: "5px" }}>
                        {num}
                      </td>
                      <td style={{ padding: "5px" }}>
                        [{cateStr}]
                        <br />
                        <a
                          href={`/Mypage/Detail/${order.no}?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`}
                          onClick={(e) => e.preventDefault()}
                        >
                          {order.lec_name}
                        </a>
                      </td>
                      <td className="text-center" style={{ padding: "5px" }}>
                        {order.lec_start} ~ {order.lec_end}
                      </td>
                      <td className="text-center" style={{ padding: "5px" }}>
                        {priceStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* 페이지네이션 컴포넌트 추가 */}
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(totalRecords / itemsPerPage)}
              onPageChange={(newPage) =>
                navigate(
                  `/Mypage/Index?Page=${newPage}&SearchField=${searchField}&SearchQuery=${searchQuery}`
                )
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}

// 페이지네이션 컴포넌트
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MyLectureList;
