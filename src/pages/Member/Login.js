import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

const LoginSection = styled.section`
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
  margin-left: 5px;
  border-top-left-radius: 0.3;
  border-bottom-left-radius: 0.3;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  background-color: #5fcf80;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4caf50;
  }
`;

const LinksRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const LinkCol = styled.div`
  flex: 1;
  text-align: ${(props) => (props.right ? "right" : "left")};
`;

const SmallLink = styled(Link)`
  color: #6c757d;
  font-size: 0.875rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// 로그인 컴포넌트
const Login = () => {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
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

  // 아이디 변경 핸들러
  const handleMemberIdChange = (e) => {
    setMemberId(e.target.value);
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 엔터 키 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  // 로그인 핸들러
  const handleLogin = async () => {
    if (!memberId.trim()) {
      alert("회원아이디를 입력해 주십시오.");
      memberIdRef.current.focus();
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해 주십시오.");
      return;
    }

    try {
      const response = await axios.post("/api/member/login", {
        member_id: memberId,
        passwd: password,
      });

      if (response.data.success) {
        // 로그인 성공 시 리디렉션
        navigate(response.data.redirectUrl || "/");
      } else {
        // 로그인 실패 시 에러 메시지 표시
        alert(response.data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <BreadcrumbsSection className="breadcrumbs">
        <Container>
          <BreadcrumbsTitle>회원 로그인</BreadcrumbsTitle>
          <BreadcrumbsText>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.
          </BreadcrumbsText>
        </Container>
      </BreadcrumbsSection>

      {/* Login Section */}
      <LoginSection>
        <Container>
          <CardContainer>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>회원 로그인</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupPrepend>
                          <i className="ni ni-email-83"></i>
                        </InputGroupPrepend>
                        <Input
                          ref={memberIdRef}
                          name="member_id"
                          placeholder="아이디"
                          type="text"
                          value={memberId}
                          onChange={handleMemberIdChange}
                          onKeyDown={handleKeyDown}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupPrepend>
                          <i className="ni ni-lock-circle-open"></i>
                        </InputGroupPrepend>
                        <Input
                          name="passwd"
                          placeholder="비밀번호"
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                          onKeyDown={handleKeyDown}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button type="button" onClick={handleLogin}>
                        로그인하기
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <LinksRow>
                <LinkCol>
                  <SmallLink to="/Member/Register">회원가입</SmallLink>
                </LinkCol>
                <LinkCol right>
                  <SmallLink to="/Member/FindIdPw">
                    아이디/비밀번호 찾기
                  </SmallLink>
                </LinkCol>
              </LinksRow>
            </div>
          </CardContainer>
        </Container>
      </LoginSection>
    </>
  );
};

export default Login;
