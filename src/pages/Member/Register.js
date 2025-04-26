import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormValidation, validationSchemas } from "../../hooks/useForm";

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

const RegisterSection = styled.section`
  padding: 60px 0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: white;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
`;

const CardTitle = styled.h2`
  margin: 0;
  text-align: center;
  color: #6c757d;
`;

const CardBody = styled.div`
  background-color: #c1c1c1;
  padding: 2rem;
`;

const FormHelp = styled.small`
  display: block;
  text-align: center;
  margin-bottom: 1rem;
  color: #6c757d;
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const InputGroupPrepend = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-right: 0;
  color: #adb5bd;
  background-color: white;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const PhoneInput = styled.input`
  width: 80px;
  padding: 0.5rem 1rem;
  border: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Separator = styled.span`
  margin: 0 5px;
`;

const Button = styled.button`
  display: inline-block;
  background-color: #5fcf80;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4caf50;
  }
`;

const SubmitButton = styled(Button)`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  margin-top: 1rem;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const RadioLabel = styled.label`
  margin-left: 5px;
  margin-right: 15px;
  cursor: pointer;
`;

const ValidationMessage = styled.p`
  color: ${(props) => props.color || "#dc3545"};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const CustomDatePicker = styled(DatePicker)`
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  background-color: white;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

// 에러 메시지 스타일 추가
const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [fileName, setFileName] = useState("");
  const [idValidation, setIdValidation] = useState({ status: "", message: "" });
  const [loading, setLoading] = useState(false);

  // React Hook Form 사용
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useFormValidation(validationSchemas.register);

  const watchMemberId = watch("member_id");

  useEffect(() => {
    // URL에서 알림 파라미터 확인
    const alertParam = searchParams.get("alert");
    if (alertParam) {
      alert(decodeURIComponent(alertParam));
    }

    // 로그인 상태 확인
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/member/checkLogin");
        if (response.data.isLoggedIn) {
          // 이미 로그인한 상태면 메인 페이지로 리디렉션
          navigate("/");
        }
      } catch (error) {
        console.error("로그인 상태 확인 오류:", error);
      }
    };

    checkLoginStatus();
  }, [navigate, searchParams]);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  // 생일 변경 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      setValue("birth", formattedDate);
    }
  };

  // 아이디 중복 체크
  const handleIdCheck = async () => {
    if (!watchMemberId) {
      setIdValidation({ status: "error", message: "아이디를 입력해 주세요" });
      return;
    }

    // 영문자로 시작하는지 확인
    if (!/^[a-zA-Z]/.test(watchMemberId)) {
      setIdValidation({
        status: "error",
        message: "아이디의 첫문자는 영문자이어야 합니다",
      });
      return;
    }

    // 길이 확인
    if (watchMemberId.length < 4 || watchMemberId.length > 10) {
      setIdValidation({
        status: "error",
        message: "아이디의 길이는 4자에서 10자까지 입니다",
      });
      return;
    }

    try {
      const response = await axios.post("/api/member/idCheck", {
        idStr: watchMemberId,
      });

      if (response.data.result === "dup") {
        setIdValidation({ status: "error", message: "아이디가 중복됩니다" });
        setValue("idChk", "");
      } else if (response.data.result === "ok") {
        setIdValidation({
          status: "success",
          message: "아이디는 사용가능합니다",
        });
        setValue("idChk", "ok");
      } else if (response.data.result === "no") {
        setIdValidation({
          status: "error",
          message: "허용되지 않는 아이디입니다",
        });
        setValue("idChk", "");
      }
    } catch (error) {
      console.error("아이디 중복 체크 오류:", error);
      setIdValidation({
        status: "error",
        message: "중복 체크 중 오류가 발생했습니다",
      });
    }
  };

  // 폼 제출 핸들러
  const onSubmit = async (data) => {
    if (data.idChk !== "ok") {
      alert("아이디 중복체크를 확인해 주십시오.");
      return;
    }

    setLoading(true);

    // FormData 객체 생성
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // 파일 추가
    const fileInput = document.querySelector('input[name="file1"]');
    if (fileInput && fileInput.files.length > 0) {
      formData.append("file1", fileInput.files[0]);
    }

    try {
      const response = await axios.post("/api/member/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("회원가입에 성공했습니다.");
        navigate("/member/login");
      } else {
        alert(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Breadcrumbs 섹션은 그대로 유지 */}

      {/* Register Section */}
      <RegisterSection>
        <Container>
          <CardContainer>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>회원가입</CardTitle>
                </CardHeader>
                <CardBody>
                  <FormHelp>아래의 항목을 입력해 주십시오.</FormHelp>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("idChk")} />

                    {/* 아이디 필드 */}
                    <FormRow>
                      <FormCol>
                        <FormGroup>
                          <Label>아이디</Label>
                          <InputGroup>
                            <Input
                              {...register("member_id")}
                              placeholder="아이디"
                              type="text"
                            />
                            <Button type="button" onClick={handleIdCheck}>
                              아이디중복체크
                            </Button>
                          </InputGroup>
                          {idValidation.status && (
                            <ValidationMessage
                              color={
                                idValidation.status === "success"
                                  ? "#28a745"
                                  : "#dc3545"
                              }
                              bold
                            >
                              {idValidation.message}
                            </ValidationMessage>
                          )}
                          {errors.member_id && (
                            <ErrorMessage>
                              {errors.member_id.message}
                            </ErrorMessage>
                          )}
                        </FormGroup>
                      </FormCol>
                    </FormRow>

                    {/* 나머지 필드들도 유사하게 React Hook Form으로 변환 */}
                    {/* ... */}

                    <ButtonGroup>
                      <SubmitButton type="submit" disabled={loading}>
                        {loading ? "처리 중..." : "회원가입"}
                      </SubmitButton>
                    </ButtonGroup>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </CardContainer>
        </Container>
      </RegisterSection>
    </>
  );
};

export default Register;
