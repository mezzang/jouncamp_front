import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
  padding: 60px 0;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin-bottom: 20px;
`;

const CardHeader = styled.div`
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

const CardTitle = styled.h4`
  margin: 0;
  padding-left: 20px;
  padding-top: 10px;
  font-size: 1.2rem;
`;

const CardBody = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
`;

const TableResponsive = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 95%;
  margin: 0 auto;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  & th {
    padding: 12px;
    text-align: center;
    color: #51cbce;
    font-weight: bold;
    border-bottom: 2px solid #dee2e6;
  }
`;

const TableBody = styled.tbody`
  & tr {
    background-color: ${(props) => (props.notice ? "#f5f5f5" : "white")};
  }

  & td {
    padding: 12px;
    border-bottom: 1px solid #dee2e6;
    text-align: center;

    &.text-left {
      text-align: left;
    }
  }

  @media (max-width: 768px) {
    & .mb_none {
      display: none;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const PageItem = styled.li`
  display: inline-block;
  margin: 0 2px;
`;

const PageLink = styled(Link)`
  display: block;
  padding: 5px 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  color: ${(props) => (props.active ? "white" : "#6c757d")};
  background-color: ${(props) => (props.active ? "#6c757d" : "white")};
  text-decoration: none;

  &:hover {
    background-color: ${(props) => (props.active ? "#6c757d" : "#f8f9fa")};
  }
`;

const SearchRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ButtonCol = styled.div`
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
`;

const SearchCol = styled.div`
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  text-align: center;
`;

const Button = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

const SearchForm = styled.form`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SelectField = styled.select`
  width: 90px;
  padding: 6px 12px;
  margin-right: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 6px 12px;
  margin-right: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

// 공지사항 목록 컴포넌트
const NoticeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    gongs: [],
    notices: [],
  });
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [message, setMessage] = useState("");
  const [searchField, setSearchField] = useState(
    searchParams.get("SearchField") || "Subject"
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("SearchQuery") || ""
  );

  // 페이지네이션 정보
  const page = parseInt(searchParams.get("Page")) || 1;
  const pageSize = 10;

  useEffect(() => {
    // 공지사항 목록 가져오기
    const fetchNoticeList = async () => {
      try {
        const response = await axios.get("/api/notice", {
          params: {
            page,
            pageSize,
            searchField: searchParams.get("SearchField"),
            searchQuery: searchParams.get("SearchQuery"),
          },
        });
        setData({
          gongs: response.data.gongs || [],
          notices: response.data.notices || [],
        });
        setTotalRecords(response.data.totalRecord || 0);
        setLoading(false);
      } catch (error) {
        console.error("공지사항 목록 가져오기 오류:", error);
        setLoading(false);
      }
    };

    fetchNoticeList();

    // URL에서 메시지 파라미터 확인
    const msgParam = searchParams.get("message");
    if (msgParam) {
      setMessage(decodeURIComponent(msgParam));
    }
  }, [page, searchParams]);

  // 메시지 표시
  useEffect(() => {
    if (message) {
      alert(message);
      setMessage("");
    }
  }, [message]);

  // 검색 필드 변경 핸들러
  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  // 검색어 변경 핸들러
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 제출 핸들러
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert("검색어를 입력해 주세요.");
      return;
    }

    setSearchParams({
      SearchField: searchField,
      SearchQuery: searchQuery,
    });
  };

  // 목록 버튼 핸들러
  const handleList = () => {
    navigate("/Notice");
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 페이지네이션을 위한 총 페이지 수 계산
  const totalPages = Math.ceil(totalRecords / pageSize);

  // 현재 페이지에서 나타낼 글 번호 계산
  let num = totalRecords - pageSize * (page - 1);

  return (
    <>
      {/* Breadcrumbs */}
      <BreadcrumbsSection className="breadcrumbs">
        <Container>
          <BreadcrumbsTitle>공지사항</BreadcrumbsTitle>
          <BreadcrumbsText>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.
          </BreadcrumbsText>
        </Container>
      </BreadcrumbsSection>

      {/* Content Section */}
      <CourseSection className="course">
        <Container>
          <div className="row">
            <div className="col-lg-12 col-md-12 align-items-stretch">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <i
                      className="nc-icon nc-paper"
                      style={{ paddingTop: "20px" }}
                    ></i>{" "}
                    공지사항
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <TableResponsive>
                    <Table>
                      <TableHead>
                        <tr>
                          <th>번호</th>
                          <th>제목</th>
                          <th>첨부파일</th>
                          <th>작성일</th>
                          <th>조회수</th>
                        </tr>
                      </TableHead>
                      <TableBody>
                        {/* 공지글 */}
                        {data.gongs.map((notice) => {
                          // new 이미지 처리
                          const gap = new Date() - new Date(notice.reg_date);
                          const userMinutes = 7 * 1440 * 60 * 1000; // 7일을 밀리초로 변환
                          const isNew = gap < userMinutes;

                          const cate = notice.cate
                            ? `[${notice.cateName}]`
                            : "";

                          return (
                            <tr
                              key={`gong-${notice.no}`}
                              style={{ backgroundColor: "#f5f5f5" }}
                            >
                              <td>공지</td>
                              <td
                                className="text-left"
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {cate}
                                <Link
                                  to={`/Notice/Detail/${notice.no}?Page=${page}`}
                                >
                                  {notice.subject}
                                </Link>
                                {isNew && (
                                  <img src="/img/btn_new_red.gif" alt="new" />
                                )}
                              </td>
                              <td
                                className="mb_none"
                                dangerouslySetInnerHTML={{
                                  __html: notice.fileDownStr,
                                }}
                              />
                              <td className="mb_none">
                                {new Date(notice.reg_date)
                                  .toLocaleDateString("ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })
                                  .replace(/\. /g, "/")
                                  .replace(".", "")}
                              </td>
                              <td className="mb_none">
                                {Number(notice.read_cnt).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}

                        {/* 일반 글 */}
                        {data.notices.map((notice) => {
                          // new 이미지 처리
                          const gap = new Date() - new Date(notice.reg_date);
                          const userMinutes = 7 * 1440 * 60 * 1000; // 7일을 밀리초로 변환
                          const isNew = gap < userMinutes;

                          const cate = notice.cate
                            ? `[${notice.cateName}]`
                            : "";

                          const currentNum = num--;

                          return (
                            <tr key={`notice-${notice.no}`}>
                              <td>{currentNum}</td>
                              <td
                                className="text-left"
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {cate}
                                <Link
                                  to={`/Notice/Detail/${notice.no}?Page=${page}`}
                                >
                                  {notice.subject}
                                </Link>
                                {isNew && (
                                  <img src="/img/btn_new_red.gif" alt="new" />
                                )}
                              </td>
                              <td
                                className="mb_none"
                                dangerouslySetInnerHTML={{
                                  __html: notice.fileDownStr,
                                }}
                              />
                              <td className="mb_none">
                                {new Date(notice.reg_date)
                                  .toLocaleDateString("ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })
                                  .replace(/\. /g, "/")
                                  .replace(".", "")}
                              </td>
                              <td className="mb_none">
                                {Number(notice.read_cnt).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}

                        {data.gongs.length === 0 &&
                          data.notices.length === 0 && (
                            <tr>
                              <td colSpan="5">등록된 공지사항이 없습니다.</td>
                            </tr>
                          )}
                      </TableBody>
                    </Table>
                  </TableResponsive>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="my-5">
                <div className="text-center">
                  <Pagination>
                    {/* 처음 페이지 */}
                    {page > 1 && (
                      <PageItem>
                        <PageLink
                          to={`/Notice/Index?Page=1&SearchField=${searchField}&SearchQuery=${searchQuery}`}
                        >
                          &laquo;
                        </PageLink>
                      </PageItem>
                    )}

                    {/* 이전 페이지 그룹 */}
                    {page > 5 && (
                      <PageItem>
                        <PageLink
                          to={`/Notice/Index?Page=${
                            Math.floor((page - 1) / 5) * 5
                          }&SearchField=${searchField}&SearchQuery=${searchQuery}`}
                        >
                          &lt;
                        </PageLink>
                      </PageItem>
                    )}

                    {/* 페이지 번호 */}
                    {Array.from(
                      {
                        length: Math.min(
                          5,
                          totalPages - Math.floor((page - 1) / 5) * 5
                        ),
                      },
                      (_, i) => Math.floor((page - 1) / 5) * 5 + i + 1
                    ).map((p) => (
                      <PageItem key={p}>
                        <PageLink
                          to={`/Notice/Index?Page=${p}&SearchField=${searchField}&SearchQuery=${searchQuery}`}
                          active={p === page}
                        >
                          {p}
                        </PageLink>
                      </PageItem>
                    ))}

                    {/* 다음 페이지 그룹 */}
                    {Math.floor((page - 1) / 5) * 5 + 5 < totalPages && (
                      <PageItem>
                        <PageLink
                          to={`/Notice/Index?Page=${
                            Math.floor((page - 1) / 5) * 5 + 6
                          }&SearchField=${searchField}&SearchQuery=${searchQuery}`}
                        >
                          &gt;
                        </PageLink>
                      </PageItem>
                    )}

                    {/* 마지막 페이지 */}
                    {page < totalPages && (
                      <PageItem>
                        <PageLink
                          to={`/Notice/Index?Page=${totalPages}&SearchField=${searchField}&SearchQuery=${searchQuery}`}
                        >
                          &raquo;
                        </PageLink>
                      </PageItem>
                    )}
                  </Pagination>
                </div>
              </div>
            </div>
          )}

          {/* 검색 및 버튼 */}
          <SearchRow>
            <ButtonCol>
              <Button onClick={handleList}>목록</Button>
            </ButtonCol>
            <SearchCol>
              <SearchForm onSubmit={handleSearch}>
                <SelectField
                  id="SearchField"
                  name="SearchField"
                  value={searchField}
                  onChange={handleSearchFieldChange}
                >
                  <option value="Subject">제목</option>
                  <option value="Content">내용</option>
                  <option value="Name">작성자</option>
                  <option value="SubCon">제목+내용</option>
                </SelectField>
                <SearchInput
                  type="text"
                  id="SearchQuery"
                  name="SearchQuery"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="검색어를 입력해 주세요"
                />
                <Button type="submit">search</Button>
              </SearchForm>
            </SearchCol>
          </SearchRow>
        </Container>
      </CourseSection>
    </>
  );
};

export default NoticeList;
