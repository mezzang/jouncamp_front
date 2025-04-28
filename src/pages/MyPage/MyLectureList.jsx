import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMyCourses } from "../../services/mypageService"; // 나중에 만들 거야

function MyLectureList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 쿼리스트링(Page=) 파싱
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("Page")) || 1;

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getMyCourses(page);
        setCourses(data);
      } catch (error) {
        console.error("내 강의실 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [page]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (courses.length === 0) {
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
                {courses.map((course, index) => {
                  const cateStr = [
                    course.jcLecture.catename1,
                    course.jcLecture.catename2,
                  ]
                    .filter(Boolean)
                    .join(" > ");
                  const priceStr =
                    course.price > 0 ? (
                      `${course.price.toLocaleString()}원`
                    ) : (
                      <span style={{ color: "#d2a573" }}>무료강의</span>
                    );

                  return (
                    <tr
                      key={course.no}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f5f5f5")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "")
                      }
                    >
                      <td className="text-center" style={{ padding: "5px" }}>
                        {courses.length - index - (page - 1) * 10}
                      </td>
                      <td style={{ padding: "5px" }}>
                        [{cateStr}]
                        <br />
                        <a
                          href={`/mypage/detail/${course.no}?Page=${page}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/mypage/detail/${course.no}?Page=${page}`
                            );
                          }}
                        >
                          {course.lecName}
                        </a>
                      </td>
                      <td className="text-center" style={{ padding: "5px" }}>
                        {course.lecStart} ~ {course.lecEnd}
                      </td>
                      <td className="text-center" style={{ padding: "5px" }}>
                        {priceStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyLectureList;
