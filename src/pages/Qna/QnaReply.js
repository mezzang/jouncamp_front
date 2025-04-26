import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

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

const CardFooter = styled.div`
  padding: 1.25rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
`;

const Form = styled.form`
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const FormCol = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  padding-right: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  display: block;
  width: ${(props) => props.width || "100%"};
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  min-height: 300px;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const FileInputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #6c757d;
  border: 1px solid #6c757d;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
    border-color: #545b62;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  cursor: pointer;
  margin: 0 0.5rem;

  &:hover {
    background-color: #5a6268;
  }
`;

const QuestionTitle = styled.h5`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const QuestionContent = styled.div`
  margin-bottom: 1rem;
`;

// Q&A 답변 컴포넌트
const QnaReply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [question, setQuestion] = useState(null);
  const [formData, setFormData] = useState({
    member_id: "",
    name: "",
    subject: "",
    content: "",
    tgroup: 0,
    tdepth: 0,
    tfloat: 0,
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    userId: "",
    userName: "",
  });
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);

  const page = searchParams.get("Page") || "1";
  const searchField = searchParams.get("SearchField") || "";
  const searchQuery = searchParams.get("SearchQuery") || "";

  useEffect(() => {
    // 로그인 상태 확인
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/member/checkLogin");
        if (!response.data.isLoggedIn) {
          alert("로그인이 필요합니다.");
          navigate("/Member/Login?returnUrl=/Qna/Reply/" + id);
          return false;
        }

        setUserData({
          isLoggedIn: true,
          userId: response.data.userId || "",
          userName: response.data.userName || "",
        });

        return true;
      } catch (error) {
        console.error("로그인 상태 확인 오류:", error);
        alert("로그인 상태 확인 중 오류가 발생했습니다.");
        navigate("/Member/Login");
        return false;
      }
    };

    // 질문 정보 가져오기
    const fetchQuestionData = async () => {
      try {
        const isLoggedIn = await checkLoginStatus();
        if (!isLoggedIn) return;

        const response = await axios.get(`/api/qna/${id}`);
        const qna = response.data;

        setQuestion(qna);

        // 답변 작성을 위한 정보 설정
        setFormData({
          member_id: userData.userId,
          name: userData.userName,
          subject: "",
          content: "",
          tgroup: qna.tgroup || 0,
          tdepth: (qna.tdepth || 0) + 1,
          tfloat: qna.tfloat || 0,
        });

        setLoading(false);
      } catch (error) {
        console.error("질문 정보 가져오기 오류:", error);
        alert("질문 정보를 가져오는 중 오류가 발생했습니다.");
        navigate("/Qna");
      }
    };

    fetchQuestionData();

    // URL에서 메시지 파라미터 확인
    const msgParam = searchParams.get("message");
    if (msgParam) {
      setMessage(decodeURIComponent(msgParam));
    }
  }, [id, navigate, searchParams, userData.userId, userData.userName]);

  // 메시지 표시
  useEffect(() => {
    if (message) {
      alert(message);
      setMessage("");
    }
  }, [message]);

  // 이름 업데이트
  useEffect(() => {
    if (userData.userName) {
      setFormData((prev) => ({
        ...prev,
        name: userData.userName,
        member_id: userData.userId,
      }));
    }
  }, [userData.userName, userData.userId]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 유효성 검사
    if (!formData.name.trim()) {
      alert("작성자 이름을 입력해 주십시오");
      return;
    }

    if (!formData.subject.trim()) {
      alert("글제목을 입력해 주십시오.");
      return;
    }

    const content = editorRef.current
      ? editorRef.current.getContent()
      : formData.content;
    if (!content.trim()) {
      alert("글내용을 간략히 기입해 주십시오.");
      return;
    }

    // FormData 객체 생성
    const submitData = new FormData();
    submitData.append("no", id);
    submitData.append("member_id", formData.member_id);
    submitData.append("name", formData.name);
    submitData.append("subject", formData.subject);
    submitData.append("content", content);
    submitData.append("tgroup", formData.tgroup);
    submitData.append("tdepth", formData.tdepth);
    submitData.append("tfloat", formData.tfloat);
    submitData.append("page", page);
    submitData.append("searchField", searchField);
    submitData.append("searchQuery", searchQuery);

    if (file) {
      submitData.append("file1", file);
    }

    try {
      const response = await axios.post("/api/qna/reply", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("답변이 등록되었습니다.");
        navigate(
          `/Qna/Index?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`
        );
      } else {
        alert(response.data.message || "답변 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("답변 등록 오류:", error);
      alert("답변 등록 중 오류가 발생했습니다.");
    }
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate(
      `/Qna/Index?Page=${page}&SearchField=${searchField}&SearchQuery=${searchQuery}`
    );
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!question) {
    return <div>질문 정보를 찾을 수 없습니다.</div>;
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
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-md">
              <Card className="card-user">
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
                  <Form>
                    <input
                      type="hidden"
                      name="member_id"
                      value={formData.member_id}
                    />
                    <input
                      type="hidden"
                      name="tgroup"
                      value={formData.tgroup}
                    />
                    <input
                      type="hidden"
                      name="tdepth"
                      value={formData.tdepth}
                    />
                    <input
                      type="hidden"
                      name="tfloat"
                      value={formData.tfloat}
                    />

                    <FormRow>
                      <FormCol>
                        <FormGroup>
                          <Label>글쓴이</Label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            width="200px"
                          />
                        </FormGroup>
                      </FormCol>
                    </FormRow>

                    <FormRow>
                      <FormCol>
                        <FormGroup>
                          <Label>제목</Label>
                          <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </FormCol>
                    </FormRow>

                    <FormRow>
                      <FormCol>
                        <FormGroup>
                          <Label>내용</Label>
                          <Editor
                            onInit={(evt, editor) =>
                              (editorRef.current = editor)
                            }
                            initialValue={formData.content}
                            init={{
                              height: 300,
                              menubar: false,
                              plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                              ],
                              toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                              content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                          />
                        </FormGroup>
                      </FormCol>
                    </FormRow>

                    <FormRow>
                      <FormCol>
                        <FormGroup>
                          <Label>첨부파일1</Label>
                          <FileInputGroup>
                            <Input
                              type="text"
                              id="file_route1"
                              value={fileName}
                              readOnly
                              placeholder="첨부파일을 올려주세요."
                              width="500px"
                            />
                            <FileInputLabel>
                              <span>파일 선택</span>
                              <FileInput
                                type="file"
                                name="file1"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                              />
                            </FileInputLabel>
                          </FileInputGroup>
                        </FormGroup>
                      </FormCol>
                    </FormRow>

                    <ButtonGroup>
                      <Button type="button" onClick={handleSubmit}>
                        답변쓰기
                      </Button>
                      <Button type="button" onClick={handleBackToList}>
                        목록
                      </Button>
                    </ButtonGroup>
                  </Form>
                </CardBody>

                <CardFooter>
                  <FormRow>
                    <FormCol>
                      <FormGroup>
                        <Label>
                          <strong>{question.name}</strong> 님의 질문글
                        </Label>
                        <QuestionTitle
                          dangerouslySetInnerHTML={{ __html: question.subject }}
                        />
                      </FormGroup>
                    </FormCol>
                  </FormRow>
                  <FormRow>
                    <FormCol>
                      <FormGroup>
                        <QuestionContent
                          dangerouslySetInnerHTML={{ __html: question.content }}
                        />
                      </FormGroup>
                    </FormCol>
                  </FormRow>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Container>
      </CourseSection>
    </>
  );
};

export default QnaReply;
