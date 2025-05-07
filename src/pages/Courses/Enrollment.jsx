// src/pages/Courses/Enrollment.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLectureDetail } from "../../services/courseService";
import Breadcrumbs from "../../components/Breadcrumbs";

function Enrollment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [payType, setPayType] = useState("bank");
  const [bankDepositor, setBankDepositor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLecture() {
      try {
        const data = await getLectureDetail(id);
        setLecture(data);
      } catch (error) {
        console.error("강의 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLecture();
  }, [id]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!lecture) {
    return <div>강의 정보를 불러올 수 없습니다.</div>;
  }

  const handlePayment = () => {
    if (payType === "credit") {
      alert("신용카드 결제는 아직 준비 중입니다. 무통장입금으로 진행해주세요.");
      return;
    }
    if (!bankDepositor) {
      alert("입금자명을 입력해주세요.");
      return;
    }
    if (window.confirm("해당 수강 과정을 결제하시겠습니까?")) {
      // 실제 결제 로직은 나중에 추가
      navigate("/courses");
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        title="교과과정 수강신청"
        description="수강할 강의를 선택하고 결제해 주세요."
      ></Breadcrumbs>

      {/* Course Enrollment Section */}
      <section id="course-details" className="course-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <img
                src={`/files/Lecture/${lecture.img1}`}
                className="img-fluid"
                alt="강의 이미지"
              />
              <h3>{lecture.name}</h3>
            </div>
          </div>
        </div>
      </section>

      <section id="cource-details-tabs" className="cource-details-tabs">
        <div className="container">
          <div className="row">
            <table className="table table-hover table-bordered">
              <thead>
                <tr className="text-center">
                  <th>강사</th>
                  <th>강의 기간</th>
                  <th>수강료</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    {lecture.lectureTeachers
                      .map((t) => t.jcTeacher.teacherName)
                      .join(", ")}
                  </td>
                  <td className="text-center">
                    {lecture.lecStart} ~ {lecture.lecEnd}
                  </td>
                  <td className="text-center">
                    {lecture.price > 0 ? (
                      `${lecture.price.toLocaleString()}원`
                    ) : (
                      <span style={{ color: "#d2a573" }}>무료강의</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="row mt-2">
            <table className="table table-hover table-bordered">
              <tbody>
                <tr>
                  <th>결제방식</th>
                  <td className="text-center">
                    <input
                      type="radio"
                      id="pay_type1"
                      name="pay_type"
                      value="bank"
                      checked={payType === "bank"}
                      onChange={() => setPayType("bank")}
                    />
                    <label htmlFor="pay_type1">무통장입금</label>
                    &nbsp;&nbsp;
                    <input
                      type="radio"
                      id="pay_type2"
                      name="pay_type"
                      value="credit"
                      checked={payType === "credit"}
                      onChange={() => setPayType("credit")}
                    />
                    <label htmlFor="pay_type2">신용카드</label>
                  </td>
                </tr>

                {payType === "bank" && (
                  <>
                    <tr>
                      <th>입금계좌번호</th>
                      <td className="text-center">
                        <select>
                          <option>대구은행 245-23-2222222 (주)조은캠프</option>
                          <option>국민은행 123-43-5656565 (주)조은캠프</option>
                          <option>농협 2245-11-85758546 (주)조은캠프</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>입금자명</th>
                      <td className="text-center">
                        <input
                          type="text"
                          className="form-control w-80"
                          value={bankDepositor}
                          onChange={(e) => setBankDepositor(e.target.value)}
                        />
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            <div className="text-center">
              <button
                className="btn btn-secondary mt-2"
                onClick={handlePayment}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Enrollment;
