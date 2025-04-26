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
  margin: 0 5px;

  &:hover {
    background-color: #5a6268;
  }
`;

// QnA 상세 페이지 컴포넌트
const QnaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [qna, setQna] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    userId: "",
  });

  const page = searchParams.get("Page") || "1";
  const searchField = searchParams.get("SearchField") || "";
  const searchQuery = searchParams.get("SearchQuery") || "";

  useEffect(() => {
    // 로그인 상태 확인
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/member/checkLogin");
        setUserData({
          isLoggedIn: response.data.isLoggedIn,
          userId: response.data.userId || "",
        });
      } catch (error) {
        console.error("로그인 상태 확인 오류:", error);
      }
    };

    // QnA 상세 정보 가져오기
    const fetchQnaDetail = async () => {
      try {
        const response = await axios.get(`/api/qna/${id}`);
        setQna(response.data);
        setLoading(false);
      } catch (error) {
        console.error("QnA 상세 가져오기 오류:", error);
        setLoading(false);
      }
    };

    checkLoginStatus();
    fetchQnaDetail();

    // URL에서 메시지 파라미터 확인
    const msgParam = searchParams.get("message");
    if (msgParam) {
      setMessage(decodeURIComponent(msgParam));
    }
  }, [id, searchParams]);

  // 메시지 표시
  useEffect(() => {
    if (message) {
      alert(message);
      setMessage("");
    }
  }, [message]);

  // 삭제 확인
  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      navigate(
        `/Qna/Del/${id}?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`
      );
    }
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate(
      `/Qna/Index?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`
    );
  };

  // 글쓰기 페이지로 이동
  const handleWrite = () => {
    navigate("/Qna/Write");
  };

  // 답변 작성 페이지로 이동
  const handleReply = () => {
    navigate(
      `/Qna/Reply/${id}?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`
    );
  };

  // 수정 페이지로 이동
  const handleModify = () => {
    navigate(
      `/Qna/Mod/${id}?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`
    );
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!qna) {
    return <div>질문을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <BreadcrumbsSection className="breadcrumbs">
        <Container>
          <BreadcrumbsTitle>질문과 답변</BreadcrumbsTitle>
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
                    질문과 답변
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Subject>{qna.subject}</Subject>
                  <PostMeta>
                    <span>글쓴이: {qna.name}</span>
                    <span>조회수: {Number(qna.read_cnt).toLocaleString()}</span>
                    <span>
                      등록일:{" "}
                      {new Date(qna.reg_date)
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
                      __html: qna.content.replace(/\r\n/g, "<br />"),
                    }}
                  />
                </CardBody>

                {(qna.filename1 || qna.filename2 || qna.filename3) && (
                  <CardFooter>
                    <FileList>
                      {qna.filename1 && (
                        <FileItem>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: qna.filename1Str,
                            }}
                          />
                        </FileItem>
                      )}
                      {qna.filename2 && (
                        <FileItem>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: qna.filename2Str,
                            }}
                          />
                        </FileItem>
                      )}
                      {qna.filename3 && (
                        <FileItem>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: qna.filename3Str,
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
              <ButtonGroup>
                <Button onClick={handleWrite}>글쓰기</Button>
                <Button onClick={handleReply}>답변쓰기</Button>

                {userData.isLoggedIn && userData.userId === qna.member_id && (
                  <>
                    <Button onClick={handleModify}>수정</Button>
                    <Button onClick={handleDelete}>삭제</Button>
                  </>
                )}

                <Button onClick={handleBackToList}>목록</Button>
              </ButtonGroup>
            </div>
          </div>
        </Container>
      </CourseSection>
    </>
  );
};

export default QnaDetail;
