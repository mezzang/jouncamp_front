import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// 스타일 컴포넌트 정의
const BreadcrumbsSection = styled.div`
  padding: 40px 0;
  background-color: #f9f9f9;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const BreadcrumbsTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: bold;
`;

const BreadcrumbsText = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const CourseDetailsSection = styled.section`
  padding: 40px 0 20px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const Col = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 15px;
`;

const CourseImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const CourseTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CourseTabsSection = styled.section`
  padding: 0 0 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: white;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: center;
  border: 1px solid #dee2e6;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #dee2e6;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const RadioLabel = styled.label`
  margin-left: 5px;
  cursor: pointer;
`;

const Select = styled.select`
  width: 80%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 80%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const MarginTop = styled.div`
  margin-top: ${(props) => props.value || "0"}px;
`;

// 수강 신청 컴포넌트
const CourseEnrollment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [bankDepositor, setBankDepositor] = useState("");
  const [selectedBank, setSelectedBank] = useState("대구은행|245-23-2222222");

  useEffect(() => {
    // 로그인 상태 확인
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/member/checkLogin");
        if (!response.data.isLoggedIn) {
          alert("회원 로그인을 해 주십시오.");
          navigate("/Member/Login");
        }
      } catch (error) {
        console.error("로그인 상태 확인 오류:", error);
        alert("회원 로그인을 해 주십시오.");
        navigate("/Member/Login");
      }
    };

    // 강의 정보 가져오기
    const fetchLectureDetails = async () => {
      try {
        const response = await axios.get(`/api/lectures/${id}`);
        setLecture(response.data);
        setLoading(false);
      } catch (error) {
        console.error("강의 정보 가져오기 오류:", error);
        setLoading(false);
      }
    };

    checkLoginStatus();
    fetchLectureDetails();
  }, [id, navigate]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleBankDepositorChange = (e) => {
    setBankDepositor(e.target.value);
  };

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "credit") {
      alert(
        "신용카드 결제는 아직 준비중입니다.\n무통장입금 방식으로 결제처리해 주십시오."
      );
      return;
    }

    if (paymentMethod === "bank" && !bankDepositor.trim()) {
      alert("입금자명을 입력해 주십시오.");
      return;
    }

    if (window.confirm("해당 수강과정을 결제하시겠습니까?")) {
      try {
        const paymentData = {
          lec_no: lecture.no,
          lec_name: lecture.name,
          lec_start: lecture.lec_start,
          lec_end: lecture.lec_end,
          price: lecture.price,
          pay_type: paymentMethod,
          bank: selectedBank,
          bank_depositor: bankDepositor,
        };

        const response = await axios.post(
          "/api/courses/enrollment",
          paymentData
        );
        alert("수강 신청이 완료되었습니다.");
        navigate("/mycourses"); // 수강신청 완료 후 이동할 페이지
      } catch (error) {
        console.error("수강 신청 오류:", error);
        alert("수강 신청 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!lecture) {
    return <div>강의 정보를 찾을 수 없습니다.</div>;
  }

  // 강사 이름 문자열 생성
  const teachersStr = lecture.lectureTeachers
    .map((lt) => lt.jcTeacher.teacher_name)
    .join(", ");

  // 가격 문자열 생성
  let priceDisplay;
  if (lecture.price > 0) {
    priceDisplay = lecture.price.toLocaleString();
  } else {
    priceDisplay = <span style={{ color: "#d2a573" }}>무료강의</span>;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <BreadcrumbsSection data-aos="fade-in" className="breadcrumbs">
        <Container>
          <BreadcrumbsTitle>교과과정</BreadcrumbsTitle>
          <BreadcrumbsText>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.
          </BreadcrumbsText>
        </Container>
      </BreadcrumbsSection>

      {/* Course Details Section */}
      <CourseDetailsSection id="course-details" className="course-details">
        <Container>
          <Row>
            <Col>
              <CourseImage
                src={`/files/Lecture/${lecture.img1}`}
                alt={lecture.name}
              />
              <CourseTitle>{lecture.name}</CourseTitle>
            </Col>
          </Row>
        </Container>
      </CourseDetailsSection>

      {/* Course Details Tabs Section */}
      <CourseTabsSection
        id="cource-details-tabs"
        className="cource-details-tabs"
      >
        <Container>
          <Row>
            <Table className="table table-hover table-bordered">
              <TableHead>
                <tr>
                  <TableHeader>강사</TableHeader>
                  <TableHeader>강의 기간</TableHeader>
                  <TableHeader>수강료</TableHeader>
                </tr>
              </TableHead>
              <tbody>
                <tr>
                  <TableCell>
                    <a href="#">{teachersStr}</a>
                  </TableCell>
                  <TableCell>
                    {lecture.lec_start} ~ {lecture.lec_end}
                  </TableCell>
                  <TableCell>{priceDisplay}</TableCell>
                </tr>
              </tbody>
            </Table>
          </Row>

          <MarginTop value={20}>
            <Form onSubmit={handleSubmit}>
              <input type="hidden" name="lec_no" value={lecture.no} />
              <input type="hidden" name="lec_name" value={lecture.name} />
              <input type="hidden" name="lec_start" value={lecture.lec_start} />
              <input type="hidden" name="lec_end" value={lecture.lec_end} />
              <input type="hidden" name="price" value={lecture.price} />

              <Table className="table table-hover table-bordered">
                <tbody>
                  <tr>
                    <TableHeader>결제방식</TableHeader>
                    <TableCell>
                      <RadioGroup>
                        <div>
                          <input
                            type="radio"
                            id="pay_type1"
                            name="pay_type"
                            value="bank"
                            checked={paymentMethod === "bank"}
                            onChange={handlePaymentMethodChange}
                          />
                          <RadioLabel htmlFor="pay_type1">
                            무통장입금
                          </RadioLabel>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="pay_type2"
                            name="pay_type"
                            value="credit"
                            checked={paymentMethod === "credit"}
                            onChange={handlePaymentMethodChange}
                          />
                          <RadioLabel htmlFor="pay_type2">신용카드</RadioLabel>
                        </div>
                      </RadioGroup>
                    </TableCell>
                  </tr>

                  {paymentMethod === "bank" && (
                    <>
                      <tr>
                        <TableHeader>입금계좌번호</TableHeader>
                        <TableCell>
                          <Select
                            name="bank"
                            value={selectedBank}
                            onChange={handleBankChange}
                          >
                            <option value="대구은행|245-23-2222222">
                              대구은행 245-23-2222222 (주)조은캠프
                            </option>
                            <option value="국민은행|123-43-5656565">
                              국민은행 123-43-5656565 (주)조은캠프
                            </option>
                            <option value="농협|2245-11-85758546">
                              농협 2245-11-85758546 (주)조은캠프
                            </option>
                          </Select>
                        </TableCell>
                      </tr>
                      <tr>
                        <TableHeader>입금자명</TableHeader>
                        <TableCell>
                          <Input
                            type="text"
                            name="bank_depositor"
                            value={bankDepositor}
                            onChange={handleBankDepositorChange}
                            className="form-control w-80"
                          />
                        </TableCell>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>

              <Button type="submit">결제하기</Button>
            </Form>
          </MarginTop>
        </Container>
      </CourseTabsSection>
    </>
  );
};

export default CourseEnrollment;
