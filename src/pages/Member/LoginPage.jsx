// src/pages/Member/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function LoginPage() {
  const [memberId, setMemberId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState(""); // 에러 메시지 상태 추가
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggedIn } = useAuth();

  // 이미 로그인된 경우 홈으로 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // 로그인 핸들러
  const handleLogin = async () => {
    if (!memberId.trim()) {
      setError("회원아이디를 입력해 주십시오.");
      return;
    }
    if (!passwd.trim()) {
      setError("비밀번호를 입력해 주십시오.");
      return;
    }

    setError("");

    try {
      // 백엔드 LoginRequest 모델과 일치하도록 필드명 유지
      const response = await axios.post("/api/Member/login", {
        MemberId: memberId,
        Password: passwd,
      });

      // 성공 시 사용자 정보를 AuthContext에 저장
      if (response.data.success) {
        // 사용자 정보 저장 (토큰이 아닌 사용자 객체)
        login(response.data.user);

        // 이전 페이지 또는 기본 페이지로 리다이렉트
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      } else {
        setError(response.data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);

      // 응답에 따른 오류 메시지 처리
      if (error.response) {
        // 서버가 응답한 경우 - 상태 코드에 따른 에러 처리
        if (error.response.status === 401) {
          setError("로그인 정보가 맞지 않습니다.");
        } else if (
          error.response.data.errors &&
          Array.isArray(error.response.data.errors)
        ) {
          // 백엔드에서 반환하는 errors 배열 처리 추가
          setError(error.response.data.errors.join(", "));
        } else {
          setError(error.response.data.message || "서버 오류가 발생했습니다.");
        }
      } else if (error.request) {
        // 요청은 보냈으나 응답을 받지 못한 경우
        setError("서버와 통신할 수 없습니다. 인터넷 연결을 확인해주세요.");
      } else {
        // 요청 설정 중 오류 발생
        setError("요청 중 오류가 발생했습니다.");
      }
    }
  };

  // 엔터 키로 로그인 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  // 컴포넌트 마운트 시 아이디 입력 필드에 포커스
  useEffect(() => {
    const idInput = document.querySelector('input[type="text"]');
    if (idInput) {
      idInput.focus();
    }
  }, []);

  return (
    <>
      {/* ======= Breadcrumbs ======= */}
      <Breadcrumbs
        title="회원 로그인"
        description="Est dolorum ut non facere possimus quibusdam eligendi voluptatem. 
        Quia id aut similique quia voluptas sit quaerat debitis. 
        Rerum omnis ipsam aperiam consequatur laboriosam nemo harum praesentium."
      />
      {/* ======= End Breadcrumbs ======= */}

      <section className="section section-shaped section-lg">
        <div className="container pt-lg-7">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card bg-secondary shadow border-0">
                <div className="card-header bg-white pb-5">
                  <div className="text-muted text-center mt-3">
                    <h2>회원 로그인</h2>
                  </div>
                </div>
                <div
                  className="card-body px-lg-5 py-lg-5"
                  style={{ background: "#c1c1c1" }}
                >
                  <div className="text-center text-muted mb-4">
                    <small></small>
                  </div>

                  {/* 에러 메시지 표시 */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="form-group mb-3">
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="아이디"
                        style={{
                          marginLeft: "5px",
                          borderTopLeftRadius: "0.3",
                          borderBottomLeftRadius: "0.3",
                        }}
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>
                  <div className="form-group focused">
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-lock-circle-open"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="비밀번호"
                        style={{
                          marginLeft: "5px",
                          borderTopLeftRadius: "0.3",
                          borderBottomLeftRadius: "0.3",
                        }}
                        value={passwd}
                        onChange={(e) => setPasswd(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary my-4"
                      style={{ background: "#5fcf80", borderColor: "#5fcf80" }}
                      onClick={handleLogin}
                    >
                      로그인하기
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <Link to="/Member/Register" className="">
                    <small>회원가입</small>
                  </Link>
                </div>
                <div className="col-6" style={{ textAlign: "right" }}>
                  <Link to="/Member/FindIdPw" className="">
                    <small>아이디/비밀번호 찾기</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
