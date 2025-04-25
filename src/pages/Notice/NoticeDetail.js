import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
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
  padding: 20px 35px 20px 50px;
`;

const CardFooter = styled.div`
  padding: 0.75rem 1.25rem;
  border: 0;
`;

const Subject = styled.div`
  font-size: 1.5em;
  color: cadetblue;
`;

const PostMeta = styled.div`
  text-align: right;

  span {
    margin-left: 14px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const Content = styled.p`
  color: #2f4f4f;
  padding-top: 20px;
  white-space: pre-wrap;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  border: 0;
`;

const FileItem = styled.li`
  border: 0;
  padding: 8px 0;
`;

const ButtonGroup = styled.div`
  text-align: center;
  margin-top: 20px;
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

// 공지사항 상세 페이지 컴포넌트
const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const page = searchParams.get("Page") || "1";
  const searchField = searchParams.get("SearchField") || "";
  const searchQuery = searchParams.get("SearchQuery") || "";

  useEffect(() => {
    // 공지사항 상세 정보 가져오기
    const fetchNoticeDetail = async () => {
      try {
        const response = await axios.get(`/api/notice/${id}`);
        setNotice(response.data);
        setLoading(false);
      } catch (error) {
        console.error("공지사항 상세 가져오기 오류:", error);
        setLoading(false);
      }
    };

    fetchNoticeDetail();

    // URL에서 메시지 파라미터 확인
    const msgParam = searchParams.get("message");
    if (msgParam) {
      setMessage(decodeURIComponent(msgParam));
    }
  }, [id, searchParams]);

  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate(
      `/Notice/Index?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`
    );
  };

  // 메시지 표시
  useEffect(() => {
    if (message) {
      alert(message);
      setMessage("");
    }
  }, [message]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

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
          <div className="col-lg-12 col-md-12 align-items-stretch">
            <div className="col-md">
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
                  <Subject>
                    {notice.gong === "y" && (
                      <span style={{ color: "red" }}>[공지글]</span>
                    )}{" "}
                    {notice.subject}
                  </Subject>
                  <PostMeta>
                    <span>글쓴이: {notice.name}</span>
                    <span>
                      조회수: {Number(notice.read_cnt).toLocaleString()}
                    </span>
                    <span>
                      등록일:{" "}
                      {new Date(notice.reg_date)
                        .toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/\. /g, "/")
                        .replace(".", "")}
                    </span>
                  </PostMeta>
                  <Content
                    dangerouslySetInnerHTML={{
                      __html: notice.content.replace(/\r\n/g, "<br />"),
                    }}
                  />
                </CardBody>

                {(notice.filename1 || notice.filename2 || notice.filename3) && (
                  <CardFooter>
                    <FileList>
                      {notice.filename1 && (
                        <FileItem>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: notice.filename1Str,
                            }}
                          />
                        </FileItem>
                      )}
                      {notice.filename2 && (
                        <FileItem>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: notice.filename2Str,
                            }}
                          />
                        </FileItem>
                      )}
                      {notice.filename3 && (
                        <FileItem>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: notice.filename3Str,
                            }}
                          />
                        </FileItem>
                      )}
                    </FileList>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>

          <div className="row mt-2" style={{ justifyContent: "center" }}>
            <div className="col-md-10 text-center">
              <Button onClick={handleBackToList}>목록</Button>
            </div>
          </div>
        </Container>
      </CourseSection>
    </>
  );
};

export default NoticeDetail;
