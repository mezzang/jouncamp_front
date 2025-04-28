import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLectureDetail, getLectureVods } from "../../services/courseService";

function CourseDetail() {
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);
  const [vods, setVods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLectureData() {
      try {
        const lectureData = await getLectureDetail(id);
        setLecture(lectureData);

        const vodData = await getLectureVods(id);
        setVods(vodData);
      } catch (error) {
        console.error("강의 상세 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLectureData();
  }, [id]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!lecture) {
    return <div>강의 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>교과과정</h2>
          <p>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
          </p>
        </div>
      </div>

      {/* Course Details Section */}
      <section id="course-details" className="course-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <img
                src={`/files/Lecture/${lecture.img1}`}
                className="img-fluid"
                alt="강의 이미지"
              />
              <h3>{lecture.name}</h3>
              <p dangerouslySetInnerHTML={{ __html: lecture.intro }} />
            </div>

            <div className="col-lg-4">
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>강사</h5>
                <p>
                  <a href="#">
                    {lecture.lectureTeachers
                      .map((t) => t.jcTeacher.teacherName)
                      .join(", ")}
                  </a>
                </p>
              </div>

              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>강의기간</h5>
                <p>
                  {lecture.lecStart} ~ {lecture.lecEnd}
                </p>
              </div>

              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>수강료</h5>
                <p>
                  {lecture.price > 0 ? (
                    lecture.price.toLocaleString() + "원"
                  ) : (
                    <span style={{ color: "#d2a573" }}>무료강의</span>
                  )}
                </p>
              </div>

              <div
                className="course-info text-center"
                style={{ background: "#fff" }}
              >
                {/* 수강신청 버튼은 Enrollment로 이동하는 Link로 나중에 만들 수 있어! */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Tabs Section */}
      <section id="cource-details-tabs" className="cource-details-tabs">
        <div className="container">
          <div className="row">
            <table className="table table-hover table-bordered table-sm">
              <thead>
                <tr className="text-center">
                  <th scope="col" style={{ padding: "5px" }}>
                    번호
                  </th>
                  <th scope="col" style={{ padding: "5px" }}>
                    내용
                  </th>
                  <th scope="col" style={{ padding: "5px" }}>
                    시간
                  </th>
                </tr>
              </thead>
              <tbody>
                {vods.map((vod) => (
                  <tr key={vod.vodNum}>
                    <td className="text-center" style={{ padding: "5px" }}>
                      {vod.vodNum}
                    </td>
                    <td style={{ padding: "5px" }}>{vod.vodTitle}</td>
                    <td className="text-center" style={{ padding: "5px" }}>
                      {vod.vodTime > 0 ? `${vod.vodTime}분` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseDetail;
