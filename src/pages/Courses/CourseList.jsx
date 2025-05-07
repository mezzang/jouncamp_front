// src/pages/Courses/CourseList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLectures } from "../../services/courseService"; // 서비스 불러오기
import Breadcrumbs from "../../components/Breadcrumbs";

function CourseList() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    async function fetchLectures() {
      try {
        const data = await getLectures();
        setLectures(data);
      } catch (error) {
        console.error("강의 목록 불러오기 실패:", error);
      }
    }

    fetchLectures();
  }, []);

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        title="교과과정"
        description="교육과정에 대한 간단한 설명을 적을 수 있습니다."
      />
      {/* End Breadcrumbs */}

      {/* Courses Section */}
      <section id="courses" className="courses">
        <div className="container">
          <div className="row">
            {lectures.map((lecture) => {
              const category = [lecture.catename1, lecture.catename2]
                .filter(Boolean)
                .join(" > ");
              const priceStr =
                lecture.price > 0 ? (
                  `${lecture.price.toLocaleString()}원`
                ) : (
                  <span style={{ color: "#d2a573" }}>무료강의</span>
                );

              return (
                <div
                  className="col-lg-4 col-md-6 d-flex align-items-stretch"
                  key={lecture.no}
                >
                  <div className="course-item">
                    {lecture.img1 && (
                      <img
                        src={`/files/Lecture/${lecture.img1}`}
                        className="img-fluid"
                        alt="강의 이미지"
                      />
                    )}
                    <div className="course-content">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>{category}</h4>
                        <p className="price">{priceStr}</p>
                      </div>

                      <h3>
                        <Link to={`/courses/detail/${lecture.no}`}>
                          {lecture.name}
                        </Link>
                      </h3>
                      <p>{lecture.subName}</p>

                      {lecture.lectureTeachers.map((teacher, index) => (
                        <div
                          className="trainer d-flex justify-content-between align-items-center"
                          key={index}
                        >
                          <div className="trainer-profile d-flex align-items-center">
                            <img
                              src={`/files/Teacher/${teacher.jcTeacher.img1}`}
                              className="img-fluid"
                              alt="강사 이미지"
                            />
                            <span>{teacher.jcTeacher.teacherName}</span>
                          </div>
                          <div className="trainer-rank d-flex align-items-center">
                            <i className="bx bxs-heart"></i>&nbsp;65
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseList;
