// src/pages/Member/RegisterPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Breadcrumbs from "../../components/Breadcrumbs";
import "react-datepicker/dist/react-datepicker.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    member_id: "",
    passwd: "",
    name: "",
    birth: null,
    sex: "남",
    hp1: "010",
    hp2: "",
    hp3: "",
    email: "",
    idChecked: false,
  });

  const [idCheckResult, setIdCheckResult] = useState({
    checked: false,
    message: "",
    status: "", // "ok", "dup", "no" 중 하나
  });

  const [error, setError] = useState(""); // 에러 메시지 상태 추가
  const navigate = useNavigate();

  // axios 기본 설정 - 세션 쿠키를 주고받기 위해 필요
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // 컴포넌트 마운트 시 아이디 입력 필드에 포커스
  useEffect(() => {
    const idInput = document.querySelector('input[name="member_id"]');
    if (idInput) {
      idInput.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 아이디 필드가 변경되면 중복 체크 결과 초기화
    if (name === "member_id") {
      setIdCheckResult({
        checked: false,
        message: "",
        status: "",
      });
      setFormData((prev) => ({
        ...prev,
        idChecked: false, // 아이디 변경 시 중복 체크 상태 초기화
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      birth: date,
    }));
  };

  // 숫자만 입력 허용하는 함수
  const handleNumberInput = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/[^0-9]/g, "");
    if (onlyNums !== value) {
      e.target.value = onlyNums;
    }
  };

  // 자동 포커스 이동 함수
  const handleFocusMove = (e, max, nextField) => {
    if (e.target.value.length >= max) {
      const nextInput = document.querySelector(`input[name="${nextField}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // 아이디 중복 체크
  const handleIdCheck = async () => {
    const id = formData.member_id.trim();
    setError(""); // 에러 메시지 초기화

    if (!id) {
      setError("아이디를 입력해 주세요.");
      return;
    }

    // 첫 글자가 영문인지 확인
    const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (abc.indexOf(id.charAt(0)) === -1) {
      setError("아이디의 첫문자는 영문자이어야 합니다.");
      setIdCheckResult({
        checked: false,
        message: "",
        status: "",
      });
      return;
    }

    // 길이 확인
    if (id.length < 4 || id.length > 10) {
      setError("아이디의 길이는 4자에서 10자까지 입니다.");
      setIdCheckResult({
        checked: false,
        message: "",
        status: "",
      });
      return;
    }

    try {
      const response = await axios.get(`/api/Member/check-id/${id}`);

      if (response.data.success) {
        if (response.data.available) {
          // 사용 가능한 아이디
          setIdCheckResult({
            checked: true,
            message: "아이디는 사용가능합니다.",
            status: "ok",
          });
          setFormData((prev) => ({ ...prev, idChecked: true }));
        } else {
          // 사용 불가능한 아이디
          setIdCheckResult({
            checked: true,
            message: response.data.message || "사용할 수 없는 아이디입니다.",
            status: "dup",
          });
          setFormData((prev) => ({ ...prev, idChecked: false }));
        }
      } else {
        // API가 success: false를 반환한 경우
        setIdCheckResult({
          checked: true,
          message: response.data.message || "아이디 확인에 실패했습니다.",
          status: "no",
        });
        setFormData((prev) => ({ ...prev, idChecked: false }));
      }
    } catch (error) {
      console.error("아이디 중복 체크 실패:", error);

      if (error.response && error.response.status === 409) {
        // 충돌(중복)인 경우
        setIdCheckResult({
          checked: true,
          message: "이미 사용 중인 아이디입니다.",
          status: "dup",
        });
        setFormData((prev) => ({ ...prev, idChecked: false }));
      } else {
        setError("서버 오류로 아이디를 확인할 수 없습니다.");
        setIdCheckResult({
          checked: false,
          message: "",
          status: "",
        });
      }
    }
  };

  const handleRegister = async () => {
    setError(""); // 에러 메시지 초기화

    // 유효성 검사
    if (!formData.idChecked) {
      setError("아이디 중복체크를 확인해 주십시오.");
      return;
    }
    if (!formData.member_id) {
      setError("아이디를 입력해 주십시오.");
      return;
    }
    if (!formData.passwd) {
      setError("비밀번호를 입력해 주십시오.");
      return;
    }
    if (!formData.name) {
      setError("이름을 입력해 주십시오.");
      return;
    }
    if (!formData.birth) {
      setError("생년월일을 제대로 선택해 주십시오.");
      return;
    }
    if (!formData.hp2) {
      setError("휴대폰번호를 입력해 주십시오.");
      return;
    }
    if (!formData.hp3) {
      setError("휴대폰번호를 입력해 주십시오.");
      return;
    }
    if (!formData.email) {
      setError("이메일을 입력해 주십시오.");
      return;
    }

    try {
      // API 요청 모델에 맞게 데이터 구성 - 필드명 대소문자 수정
      const registerData = {
        // 백엔드 RegisterRequest 모델과 일치하도록 Member_id로 변경
        Member_id: formData.member_id,
        Passwd: formData.passwd,
        Name: formData.name,
        // 날짜 형식을 명확하게 처리
        Birth: formData.birth ? formData.birth.toISOString().split("T")[0] : "",
        Sex: formData.sex,
        Hp1: formData.hp1,
        Hp2: formData.hp2,
        Hp3: formData.hp3,
        Email: formData.email,
        Zipcode: "", // 선택 필드
        Address1: "", // 선택 필드
        Address2: "", // 선택 필드
      };

      const response = await axios.post("/api/Member/register", registerData);

      if (response.data.success) {
        alert("회원가입이 완료되었습니다.");
        navigate("/Member/Login");
      } else {
        setError(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);

      if (error.response) {
        // 서버가 응답한 경우
        if (error.response.status === 409) {
          setError("이미 가입된 회원입니다.");
        } else if (
          error.response.data.errors &&
          Array.isArray(error.response.data.errors)
        ) {
          // 백엔드에서 반환하는 errors 배열 처리 추가
          setError(error.response.data.errors.join(", "));
        } else {
          setError(
            error.response.data.message || "서버 오류로 회원가입할 수 없습니다."
          );
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

  return (
    <>
      {/* ======= Breadcrumbs ======= */}
      <Breadcrumbs
        title="회원가입"
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
                    <h2>회원가입</h2>
                  </div>
                </div>
                <div
                  className="card-body px-lg-5 py-lg-5"
                  style={{ background: "#c1c1c1" }}
                >
                  <div className="text-center text-muted mb-4">
                    <small>아래의 항목을 입력해 주십시오.</small>
                  </div>

                  {/* 에러 메시지 표시 */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="form-group">
                    <div className="input-group input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="member_id"
                        placeholder="아이디"
                        className="form-control"
                        value={formData.member_id}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={handleIdCheck}
                        className="btn btn-primary"
                        style={{
                          background: "#5fcf80",
                          borderColor: "#5fcf80",
                        }}
                      >
                        아이디중복체크
                      </button>
                    </div>
                    {idCheckResult.checked && (
                      <span
                        id="sp_dupID"
                        style={{
                          color:
                            idCheckResult.status === "ok" ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {idCheckResult.message}
                      </span>
                    )}
                    <p>
                      ※ 첫문자는 영문자로, 영문자와 숫자로 최소4자에서 10자내외
                    </p>
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
                        name="passwd"
                        placeholder="비밀번호"
                        className="form-control"
                        value={formData.passwd}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 나머지 폼 필드들은 그대로 유지 */}
                  <div className="form-group">
                    <div className="input-group input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-hat-3"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="이름"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <DatePicker
                        selected={formData.birth}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="생년월일 선택"
                        className="form-control"
                        name="birth"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sex"
                        id="sex1"
                        value="남"
                        checked={formData.sex === "남"}
                        onChange={handleChange}
                        style={{ marginLeft: "10px" }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sex1"
                        style={{ marginLeft: "10px" }}
                      >
                        남자
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sex"
                        id="sex2"
                        value="여"
                        checked={formData.sex === "여"}
                        onChange={handleChange}
                        style={{ marginLeft: "10px" }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sex2"
                        style={{ marginLeft: "10px" }}
                      >
                        여자
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="hp1"
                        value={formData.hp1}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="휴대폰번호"
                        onKeyUp={(e) => {
                          handleNumberInput(e);
                          handleFocusMove(e, 3, "hp2");
                        }}
                        maxLength={3}
                      />
                      -
                      <input
                        type="text"
                        name="hp2"
                        value={formData.hp2}
                        onChange={handleChange}
                        className="form-control"
                        placeholder=""
                        onKeyUp={(e) => {
                          handleNumberInput(e);
                          handleFocusMove(e, 4, "hp3");
                        }}
                        maxLength={4}
                      />
                      -
                      <input
                        type="text"
                        name="hp3"
                        value={formData.hp3}
                        onChange={handleChange}
                        className="form-control"
                        placeholder=""
                        onKeyUp={(e) => {
                          handleNumberInput(e);
                          handleFocusMove(e, 4, "email");
                        }}
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="btn btn-success mt-4"
                      style={{ background: "#5fcf80", borderColor: "#5fcf80" }}
                    >
                      회원가입
                    </button>
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

export default RegisterPage;
