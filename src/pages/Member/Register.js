import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

// 회원가입 컴포넌트
const Register = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    member_id: "",
    passwd: "",
    name: "",
    birth: "",
    sex: "남",
    hp1: "010",
    hp2: "",
    hp3: "",
    email: "",
    idChk: "",
  });
  const [idValidation, setIdValidation] = useState("");
  const [idValidationColor, setIdValidationColor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberIdRef = useRef(null);

  useEffect(() => {
    // URL에서 알림 파라미터 확인
    const alertParam = searchParams.get("alert");
    if (alertParam) {
      setAlert(decodeURIComponent(alertParam));
    }

    // 아이디 입력 필드에 포커스
    if (memberIdRef.current) {
      memberIdRef.current.focus();
    }
  }, [searchParams]);

  // 알림 표시
  useEffect(() => {
    if (alert) {
      window.alert(alert);
      setAlert("");
    }
  }, [alert]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 아이디 필드가 변경되면 중복 체크 상태 초기화
    if (name === "member_id") {
      setIdValidation("");
      setFormData((prev) => ({
        ...prev,
        idChk: "",
      }));
    }
  };

  // 생일 변경 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      setFormData({
        ...formData,
        birth: formattedDate,
      });
    } else {
      setFormData({
        ...formData,
        birth: "",
      });
    }
  };

  // 포커스 이동 핸들러
  const handleFocusMove = (fieldName, maxLength, nextFieldName) => (e) => {
    if (e.target.value.length >= maxLength) {
      document.getElementsByName(nextFieldName)[0].focus();
    }
  };

  // 아이디 중복 체크 핸들러
  const handleIdCheck = async () => {
    const { member_id } = formData;

    if (!member_id) {
      alert("아이디를 입력해 주세요.");
      memberIdRef.current.focus();
      return;
    }

    // 영문자로 시작하는지 확인
    const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (abc.indexOf(member_id.charAt(0)) === -1) {
      alert("아이디의 첫문자는 영문자이어야 합니다.");
      memberIdRef.current.focus();
      memberIdRef.current.select();
      setIdValidation("");
      return;
    }

    // 길이 확인
    if (member_id.length < 4 || member_id.length > 10) {
      alert("아이디의 길이는 4자에서 10자까지 입니다.");
      memberIdRef.current.focus();
      memberIdRef.current.select();
      setIdValidation("");
      return;
    }

    try {
      const response = await axios.post("/api/member/idCheck", {
        idStr: member_id,
      });

      if (response.data.result === "dup") {
        setIdValidation("아이디가 중복됩니다.");
        setIdValidationColor("#dc3545");
        memberIdRef.current.select();
        setFormData((prev) => ({
          ...prev,
          idChk: "",
        }));
      } else if (response.data.result === "ok") {
        setIdValidation("아이디는 사용가능합니다.");
        setIdValidationColor("#28a745");
        setFormData((prev) => ({
          ...prev,
          idChk: "ok",
        }));
      } else if (response.data.result === "no") {
        setIdValidation("허용되지 않는 아이디입니다.");
        setIdValidationColor("#dc3545");
        memberIdRef.current.select();
        setFormData((prev) => ({
          ...prev,
          idChk: "",
        }));
      }
    } catch (error) {
      console.error("아이디 중복 체크 오류:", error);
      alert("아이디 중복 체크 중 오류가 발생했습니다.");
    }
  };

  // 회원가입 제출 핸들러
  const handleSubmit = async () => {
    const { member_id, passwd, name, birth, hp1, hp2, hp3, email, idChk } =
      formData;

    // 유효성 검증
    if (!idChk) {
      alert("아이디 중복체크를 확인해 주십시오.");
      return;
    }

    if (!member_id) {
      alert("아이디를 입력해 주십시오.");
      memberIdRef.current.focus();
      return;
    }

    if (!passwd) {
      alert("비밀번호를 입력해 주십시오.");
      document.getElementsByName("passwd")[0].focus();
      return;
    }

    if (!name) {
      alert("이름을 입력해 주십시오.");
      document.getElementsByName("name")[0].focus();
      return;
    }

    if (!birth) {
      alert("생년월일을 제대로 선택해 주십시오.");
      return;
    }

    if (!hp1) {
      alert("휴대폰번호를 입력해 주십시오.");
      document.getElementsByName("hp1")[0].focus();
      return;
    }

    if (!hp2) {
      alert("휴대폰번호를 입력해 주십시오.");
      document.getElementsByName("hp2")[0].focus();
      return;
    }

    if (!hp3) {
      alert("휴대폰번호를 입력해 주십시오.");
      document.getElementsByName("hp3")[0].focus();
      return;
    }

    if (!email) {
      alert("이메일을 입력해 주십시오.");
      document.getElementsByName("email")[0].focus();
      return;
    }

    try {
      const response = await axios.post("/api/member/register", formData);

      if (response.data.success) {
        alert("회원가입에 성공했습니다.");
        navigate("/member/login");
      } else {
        alert(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <BreadcrumbsSection className="breadcrumbs">
        <Container>
          <BreadcrumbsTitle>회원가입</BreadcrumbsTitle>
          <BreadcrumbsText>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.
          </BreadcrumbsText>
        </Container>
      </BreadcrumbsSection>

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
                  <Form>
                    <input
                      type="hidden"
                      id="idChk"
                      name="idChk"
                      value={formData.idChk}
                    />

                    {/* 아이디 */}
                    <FormGroup>
                      <InputGroup>
                        <InputGroupPrepend>
                          <i className="ni ni-email-83"></i>
                        </InputGroupPrepend>
                        <Input
                          ref={memberIdRef}
                          placeholder="아이디"
                          type="text"
                          id="member_id"
                          name="member_id"
                          value={formData.member_id}
                          onChange={handleInputChange}
                        />
                        <Button type="button" onClick={handleIdCheck}>
                          아이디중복체크
                        </Button>
                      </InputGroup>
                      {idValidation && (
                        <ValidationMessage color={idValidationColor} bold>
                          {idValidation}
                        </ValidationMessage>
                      )}
                      <ValidationMessage style={{ display: "none" }}>
                        ※ 첫문자는 영문자로, 영문자와 숫자로 최소4자에서
                        10자내외
                      </ValidationMessage>
                    </FormGroup>

                    {/* 비밀번호 */}
                    <FormGroup>
                      <InputGroup>
                        <InputGroupPrepend>
                          <i className="ni ni-lock-circle-open"></i>
                        </InputGroupPrepend>
                        <Input
                          placeholder="비밀번호"
                          type="password"
                          name="passwd"
                          value={formData.passwd}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </FormGroup>

                    {/* 이름 */}
                    <FormGroup>
                      <InputGroup>
                        <InputGroupPrepend>
                          <i className="ni ni-hat-3"></i>
                        </InputGroupPrepend>
                        <Input
                          placeholder="이름"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </FormGroup>

                    {/* 생년월일 */}
                    <FormGroup>
                      <InputGroup>
                        <InputGroupPrepend>
                          <i className="ni ni-email-83"></i>
                        </InputGroupPrepend>
                        <CustomDatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="생년월일"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          id="birth"
                          name="birth"
                          readOnly
                        />
                      </InputGroup>
                    </FormGroup>

                    {/* 성별 */}
                    <FormGroup>
                      <InputGroup>
                        <InputGroupPrepend>
                          <i className="ni ni-email-83"></i>
                        </InputGroupPrepend>
                        <RadioGroup>
                          <input
                            type="radio"
                            id="sex1"
                            name="sex"
                            value="남"
                            checked={formData.sex === "남"}
                            onChange={handleInputChange}
                            className="form-check-input"
                            style={{ marginLeft: "10px" }}
                          />
                          <RadioLabel htmlFor="sex1">남자</RadioLabel>

                          <input
                            type="radio"
                            id="sex2"
                            name="sex"
                            value="여"
                            checked={formData.sex === "여"}
                            onChange={handleInputChange}
                            className="form-check-input"
                            style={{ marginLeft: "10px" }}
                          />
                          <RadioLabel htmlFor="sex2">여자</RadioLabel>
                        </RadioGroup>
                      </InputGroup>
                    </FormGroup>

                    {/* 휴대폰번호 */}
                    <FormGroup>
                      <InputGroup>
                        <InputGroupPrepend>
                          <i className="ni ni-email-83"></i>
                        </InputGroupPrepend>
                        <PhoneInput
                          placeholder="휴대폰번호"
                          type="text"
                          name="hp1"
                          value={formData.hp1}
                          onChange={handleInputChange}
                          onKeyUp={handleFocusMove("hp1", 3, "hp2")}
                          maxLength={3}
                        />
                        <Separator>-</Separator>
                        <PhoneInput
                          type="text"
                          name="hp2"
                          value={formData.hp2}
                          onChange={handleInputChange}
                          onKeyUp={handleFocusMove("hp2", 4, "hp3")}
                          maxLength={4}
                        />
                        <Separator>-</Separator>
                        <PhoneInput
                          type="text"
                          name="hp3"
                          value={formData.hp3}
                          onChange={handleInputChange}
                          onKeyUp={handleFocusMove("hp3", 4, "email")}
                          maxLength={4}
                        />
                      </InputGroup>
                    </FormGroup>

                    {/* 이메일 */}
                    <FormGroup>
                      <InputGroup>
                        <InputGroupPrepend>
                          <i className="ni ni-email-83"></i>
                        </InputGroupPrepend>
                        <Input
                          placeholder="이메일"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                      <SubmitButton type="button" onClick={handleSubmit}>
                        회원가입
                      </SubmitButton>
                    </div>
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
