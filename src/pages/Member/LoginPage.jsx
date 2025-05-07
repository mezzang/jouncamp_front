// src/pages/Member/LoginPage.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useAuth } from "../../context/AuthContext"; // AuthContext에서 로그인 상태를 가져옵니다.
import axios from "axios";

function LoginPage() {
  const [memberId, setMemberId] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggedIn } = useAuth();

  // 이미 로그인된 경우 홈으로 리다이렉트
  if (isLoggedIn) {
    navigate("/");
    return null;
  }

  // 로그인 핸들러
  const handleLogin = async () => {
    if (!memberId.trim()) {
      alert("회원아이디를 입력해 주십시오.");
      return;
    }
    if (!passwd.trim()) {
      alert("비밀번호를 입력해 주십시오.");
      return;
    }

    try {
      const response = await axios.post("/api/member/login", {
        memberId,
        passwd,
      });

      if (response.data.success) {
        // AuthContext에 로그인 상태 업데이트
        login(response.data.token);

        // 이전 페이지 또는 기본 페이지로 리다이렉트
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      } else {
        alert(response.data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("서버 오류로 로그인할 수 없습니다.");
    }
  };

  // 엔터 키로 로그인 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

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
                <div className="card-header bg-white pb-5 text-center">
                  <h2>회원 로그인</h2>
                </div>
                <div
                  className="card-body px-lg-5 py-lg-5"
                  style={{ background: "#c1c1c1" }}
                >
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="아이디"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className="form-group focused">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="비밀번호"
                      value={passwd}
                      onChange={(e) => setPasswd(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
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
                  <div className="row mt-3">
                    <div className="col-6">
                      <Link to="../register">
                        <small>회원가입</small>
                      </Link>
                    </div>
                    <div className="col-6 text-end">
                      <Link to="../find-idpw">
                        <small>아이디/비밀번호 찾기</small>
                      </Link>
                    </div>
                  </div>
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
