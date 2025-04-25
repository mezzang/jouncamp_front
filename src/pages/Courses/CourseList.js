import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
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

const CoursesSection = styled.section`
  padding: 60px 0;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const CourseColumn = styled.div`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 15px;
  margin-bottom: 30px;

  @media (max-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
  }

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const CourseItem = styled.div`
  border-radius: 5px;
  border: 1px solid #eef0ef;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CourseImage = styled.img`
  width: 100%;
  height: auto;
`;

const CourseContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CourseCategory = styled.h4`
  font-size: 14px;
  background: #5fcf80;
  padding: 5px 15px;
  color: white;
  border-radius: 50px;
  margin: 0;
`;

const CoursePrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const CourseTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;

  a {
    color: #37423b;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      color: #5fcf80;
    }
  }
`;

const CourseSubTitle = styled.p`
  margin-bottom: 20px;
  color: #777;
`;

const TrainerSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eef0ef;
  margin-top: auto;
`;

const TrainerProfile = styled.div`
  display: flex;
  align-items: center;
`;

const TrainerImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const TrainerName = styled.span`
  color: #5a6c60;
  font-weight: 600;
`;

const TrainerRank = styled.div`
  display: flex;
  align-items: center;
  color: #5a6c60;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const PaginationButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "#5fcf80" : "white")};
  color: ${(props) => (props.active ? "white" : "#5fcf80")};
  border: 1px solid #5fcf80;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#5fcf80" : "#eef0ef")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Courses 컴포넌트
const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = parseInt(searchParams.get("Page")) || 1;
    setCurrentPage(page);

    // 강의 목록 가져오기
    const fetchLectures = async () => {
      try {
        const response = await axios.get("/api/lectures", {
          params: { page },
        });
        setLectures(response.data.lectures);
        setTotalRecords(response.data.totalRecord);
        setLoading(false);
      } catch (error) {
        console.error("강의 목록 가져오기 오류:", error);
        setLoading(false);
      }
    };

    fetchLectures();
  }, [searchParams]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setSearchParams({ Page: newPage.toString() });
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalRecords / 10);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <BreadcrumbsSection className="breadcrumbs">
        <Container>
          <BreadcrumbsTitle>교과과정</BreadcrumbsTitle>
          <BreadcrumbsText>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.
          </BreadcrumbsText>
        </Container>
      </BreadcrumbsSection>

      {/* Courses Section */}
      <CoursesSection id="courses" className="courses">
        <Container>
          <Row>
            {lectures.map((lecture, index) => {
              // 카테고리 문자열 생성
              let cateStr = "";
              if (lecture.catename1) {
                cateStr += lecture.catename1;
              }
              if (lecture.catename2) {
                cateStr += " > " + lecture.catename2;
              }

              // 가격 문자열
              let priceDisplay;
              if (lecture.price > 0) {
                priceDisplay = lecture.price.toLocaleString();
              } else {
                priceDisplay = (
                  <span style={{ color: "#d2a573" }}>무료강의</span>
                );
              }

              return (
                <CourseColumn key={lecture.no}>
                  <CourseItem>
                    {lecture.img1 && (
                      <CourseImage
                        src={`/files/Lecture/${lecture.img1}`}
                        alt={lecture.name}
                      />
                    )}
                    <CourseContent>
                      <CourseHeader>
                        <CourseCategory>{cateStr}</CourseCategory>
                        <CoursePrice>{priceDisplay}</CoursePrice>
                      </CourseHeader>

                      <CourseTitle>
                        <Link to={`/Courses/Detail/${lecture.no}`}>
                          {lecture.name}
                        </Link>
                      </CourseTitle>

                      <CourseSubTitle
                        dangerouslySetInnerHTML={{ __html: lecture.sub_name }}
                      />

                      {lecture.lectureTeachers &&
                        lecture.lectureTeachers.map((teacher, idx) => (
                          <TrainerSection key={idx}>
                            <TrainerProfile>
                              <TrainerImage
                                src={`/files/Teacher/${teacher.jcTeacher.img1}`}
                                alt={teacher.jcTeacher.teacher_name}
                              />
                              <TrainerName>
                                {teacher.jcTeacher.teacher_name}
                              </TrainerName>
                            </TrainerProfile>
                            <TrainerRank>
                              <i className="bx bxs-heart"></i>&nbsp;65
                            </TrainerRank>
                          </TrainerSection>
                        ))}
                    </CourseContent>
                  </CourseItem>
                </CourseColumn>
              );
            })}
          </Row>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </PaginationButton>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationButton
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationButton>
              ))}

              <PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </PaginationButton>
            </Pagination>
          )}
        </Container>
      </CoursesSection>
    </>
  );
};

export default Courses;
