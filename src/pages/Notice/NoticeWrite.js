import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  min-height: 200px;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
`;

const InputGroupPrepend = styled.div`
  display: flex;
  margin-right: -1px;
`;

const InputGroupText = styled.div`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem 0 0 0.25rem;
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

// 공지사항 작성 컴포넌트
const NoticeWrite = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
  });
  const [fileNames, setFileNames] = useState({
    file1: "",
  });
  const fileInputRef = useRef(null);

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
    const { name, files } = e.target;
    if (files.length > 0) {
      const fileName = files[0].name;
      setFileNames((prev) => ({
        ...prev,
        [name.replace("userfile", "file")]: fileName,
      }));
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력 검증
    if (!formData.name.trim()) {
      alert("글쓴이를 입력해 주세요.");
      return;
    }

    if (!formData.subject.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }

    if (!formData.content.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }

    // FormData 객체 생성 (파일 첨부를 위해)
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("subject", formData.subject);
    submitData.append("content", formData.content);

    // 파일 첨부
    if (fileInputRef.current.files.length > 0) {
      submitData.append("userfile1", fileInputRef.current.files[0]);
    }

    try {
      const response = await axios.post("/api/notice/write", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("공지사항이 등록되었습니다.");
        navigate("/notice");
      } else {
        alert(response.data.message || "공지사항 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("공지사항 등록 오류:", error);
      alert("공지사항 등록 중 오류가 발생했습니다.");
    }
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate("/notice");
  };

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
          <div className="row" style={{ justifyContent: "center" }}>
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
                  <Form onSubmit={handleSubmit}>
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
                          <InputGroup>
                            <InputGroupPrepend>
                              <InputGroupText>
                                <span style={{ color: "blue" }}>한국</span>
                              </InputGroupText>
                            </InputGroupPrepend>
                            <Input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                            />
                          </InputGroup>
                        </FormGroup>
                      </FormCol>
                    </FormRow>

                    <FormRow>
                      <FormCol>
                        <FormGroup>
                          <Label>내용</Label>
                          <TextArea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
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
                              value={fileNames.file1}
                              readOnly
                              placeholder="png,jpg,gif만 올려주세요."
                              width="500px"
                            />
                            <FileInputLabel>
                              <span>파일 선택</span>
                              <FileInput
                                type="file"
                                name="userfile1"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                              />
                            </FileInputLabel>
                          </FileInputGroup>
                        </FormGroup>
                      </FormCol>
                    </FormRow>

                    <ButtonGroup>
                      <Button type="submit">글쓰기</Button>
                      <Button type="button" onClick={handleBackToList}>
                        목록
                      </Button>
                    </ButtonGroup>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </CourseSection>
    </>
  );
};

export default NoticeWrite;
