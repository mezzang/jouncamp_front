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

const CourseSection = styled.section`
  padding: 40px 0;
`;

const CourseNav = styled.nav`
  margin-bottom: 20px;
`;

const CourseNavContainer = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CourseTitle = styled.a`
  font-weight: bold;
  color: #333;
  text-decoration: none;
  font-size: 18px;
`;

const CourseTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: white;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;

  th {
    padding: 5px;
    text-align: center;
    border: 1px solid #dee2e6;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 5px;
  border: 1px solid #dee2e6;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

const CourseLink = styled(Link)`
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// 내 강의실 목록 컴포넌트
const MyCourses = () => {
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  const page = parseInt(searchParams.get("Page")) || 1;
  const searchField = searchParams.get("SearchField") || "";
  const searchQuery = searchParams.get("SearchQuery") || "";

  useEffect(() => {
    // 내 강의실 목록 가져오기
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get("/api/mypage/courses", {
          params: {
            page,
            searchField,
            searchQuery,
          },
        });
        setOrders(response.data.orders || []);
        setTotalRecords(response.data.totalRecord || 0);
        setLoading(false);
      } catch (error) {
        console.error("내 강의실 목록 가져오기 오류:", error);
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [page, searchField, searchQuery]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 현재 페이지에서 나타낼 글 번호 계산
  let num = totalRecords - 10 * (page - 1);

  return (
    <>
      {/* Breadcrumbs */}
      <BreadcrumbsSection className="breadcrumbs">
        <Container>
          <BreadcrumbsTitle>내 강의실</BreadcrumbsTitle>
          <BreadcrumbsText>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.
          </BreadcrumbsText>
        </Container>
      </BreadcrumbsSection>

      {/* Course List */}
      <CourseSection
        id="cource-details-tabs"
        className="cource-details-tabs mt-4"
      >
        <Container>
          <CourseNav className="navbar navbar-expand-lg bg-body-tertiary">
            <CourseNavContainer className="container-fluid">
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo01"
              >
                <CourseTitle href="#">현재 교과과정</CourseTitle>
              </div>
            </CourseNavContainer>
          </CourseNav>

          <div className="row">
            <CourseTable className="table table-hover table-bordered">
              <TableHead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">교과과정</th>
                  <th scope="col">강의기간</th>
                  <th scope="col">수강료</th>
                </tr>
              </TableHead>
              <tbody>
                {orders.map((order) => {
                  const currentNum = num--;

                  // 카테고리 문자열 생성
                  let cateStr = "";
                  if (order.jcLecture.catename1) {
                    cateStr += order.jcLecture.catename1;
                  }
                  if (order.jcLecture.catename2) {
                    cateStr += " > " + order.jcLecture.catename2;
                  }

                  // 가격 표시
                  let priceDisplay;
                  if (order.price > 0) {
                    priceDisplay = order.price.toLocaleString();
                  } else {
                    priceDisplay = (
                      <span style={{ color: "#d2a573" }}>무료강의</span>
                    );
                  }

                  return (
                    <TableRow key={order.no}>
                      <TableCell center>{currentNum}</TableCell>
                      <TableCell>
                        [{cateStr}]
                        <br />
                        <CourseLink
                          to={`/mypage/detail/${order.no}?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`}
                        >
                          {order.lec_name}
                        </CourseLink>
                      </TableCell>
                      <TableCell center>
                        {order.lec_start} ~ {order.lec_end}
                      </TableCell>
                      <TableCell center>{priceDisplay}</TableCell>
                    </TableRow>
                  );
                })}

                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan="4" center>
                      수강 중인 강의가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </CourseTable>
          </div>
        </Container>
      </CourseSection>
    </>
  );
};

export default MyCourses;
