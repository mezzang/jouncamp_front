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
  padding: 60px 0;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ColLg8 = styled.div`
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  padding: 0 15px;

  @media (max-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const ColLg4 = styled.div`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 15px;

  @media (max-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 30px;
  }
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

const CourseInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const InfoTitle = styled.h5`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const InfoContent = styled.p`
  margin: 0;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  background: #fff;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.secondary ? "#838341" : "#6c757d")};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    opacity: 0.9;
  }
`;

const CourseTabsSection = styled.section`
  padding: 40px 0;
  background-color: #f9f9f9;
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
  padding: 5px;
  text-align: center;
  border: 1px solid #dee2e6;
`;

const TableCell = styled.td`
  padding: 5px;
  border: 1px solid #dee2e6;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

// 강의 상세 컴포넌트
const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [vods, setVods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/member/checkLogin");
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("로그인 상태 확인 오류:", error);
        setIsLoggedIn(false);
      }
    };

    // 강의 정보 가져오기
    const fetchLectureDetails = async () => {
      try {
        const lectureResponse = await axios.get(`/api/lectures/${id}`);
        setLecture(lectureResponse.data);

        const vodsResponse = await axios.get(`/api/lectures/${id}/vods`);
        setVods(vodsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("강의 정보 가져오기 오류:", error);
        setLoading(false);
      }
    };

    checkLoginStatus();
    fetchLectureDetails();
  }, [id]);

  const handleEnrollment = () => {
    if (!isLoggedIn) {
      alert("회원 로그인을 해 주십시오.");
      navigate("/Member/Login");
      return;
    }

    navigate(`/Courses/Enrollment/${id}`);
  };

  const goBack = () => {
    navigate(-1);
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
  let priceStr;
  if (lecture.price > 0) {
    priceStr = lecture.price.toLocaleString();
  } else {
    priceStr = "무료강의";
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
            <ColLg8>
              <CourseImage
                src={`/files/Lecture/${lecture.img1}`}
                alt={lecture.name}
              />
              <CourseTitle>{lecture.name}</CourseTitle>
              <div dangerouslySetInnerHTML={{ __html: lecture.intro }} />
            </ColLg8>

            <ColLg4>
              <CourseInfo>
                <InfoTitle>강사</InfoTitle>
                <InfoContent>
                  <a href="#">{teachersStr}</a>
                </InfoContent>
              </CourseInfo>

              <CourseInfo>
                <InfoTitle>강의기간</InfoTitle>
                <InfoContent>
                  {lecture.lec_start} ~ {lecture.lec_end}
                </InfoContent>
              </CourseInfo>

              <CourseInfo>
                <InfoTitle>수강료</InfoTitle>
                <InfoContent>
                  {lecture.price > 0 ? (
                    priceStr
                  ) : (
                    <span style={{ color: "#d2a573" }}>무료강의</span>
                  )}
                </InfoContent>
              </CourseInfo>

              <ButtonContainer>
                <Button onClick={handleEnrollment}>수강 신청하기</Button>
                <Button secondary onClick={goBack} style={{ width: "120px" }}>
                  돌아가기
                </Button>
              </ButtonContainer>
            </ColLg4>
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
            <Table className="table table-hover table-bordered table-sm">
              <TableHead>
                <tr>
                  <TableHeader>번호</TableHeader>
                  <TableHeader>내용</TableHeader>
                  <TableHeader>시간</TableHeader>
                </tr>
              </TableHead>
              <tbody>
                {vods.map((vod) => {
                  const timeStr = vod.vod_time > 0 ? `${vod.vod_time} 분` : "";

                  return (
                    <TableRow key={vod.id}>
                      <TableCell center>{vod.vod_num}</TableCell>
                      <TableCell>{vod.vod_title}</TableCell>
                      <TableCell center>{timeStr}</TableCell>
                    </TableRow>
                  );
                })}

                {vods.length === 0 && (
                  <TableRow>
                    <TableCell colSpan="3" center>
                      등록된 강의 내용이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </Row>
        </Container>
      </CourseTabsSection>
    </>
  );
};

export default CourseDetails;
