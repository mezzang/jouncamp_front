// src/pages/Member/RegisterPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Breadcrumbs from "../../components/Breadcrumbs";
import "react-datepicker/dist/react-datepicker.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    memberId: "",
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      birth: date,
    }));
  };

  const handleIdCheck = async () => {
    if (!formData.memberId.trim()) {
      alert("아이디를 입력해 주세요.");
      return;
    }
    try {
      const response = await axios.post("/api/member/check-id", {
        memberId: formData.memberId,
      });
      if (response.data.status === "ok") {
        alert("아이디는 사용 가능합니다.");
        setFormData((prev) => ({ ...prev, idChecked: true }));
      } else {
        alert("아이디가 중복됩니다.");
      }
    } catch (error) {
      console.error("아이디 중복 체크 실패:", error);
      alert("서버 오류로 확인할 수 없습니다.");
    }
  };

  const handleRegister = async () => {
    if (!formData.idChecked) {
      alert("아이디 중복체크를 해주세요.");
      return;
    }
    if (
      !formData.memberId ||
      !formData.passwd ||
      !formData.name ||
      !formData.birth ||
      !formData.hp1 ||
      !formData.hp2 ||
      !formData.hp3 ||
      !formData.email
    ) {
      alert("모든 필수 항목을 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/member/register", {
        ...formData,
        birth: formData.birth?.toISOString().split("T")[0], // yyyy-mm-dd 포맷
        hp: `${formData.hp1}-${formData.hp2}-${formData.hp3}`,
      });

      if (response.data.success) {
        alert("회원가입이 완료되었습니다.");
        navigate("/member/login");
      } else {
        alert(response.data.message || "회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("서버 오류로 회원가입할 수 없습니다.");
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
                <div className="card-header bg-white pb-5 text-center">
                  <h2>회원가입</h2>
                </div>
                <div
                  className="card-body px-lg-5 py-lg-5"
                  style={{ background: "#c1c1c1" }}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      name="memberId"
                      placeholder="아이디"
                      className="form-control"
                      value={formData.memberId}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={handleIdCheck}
                      className="btn btn-primary my-2"
                      style={{ background: "#5fcf80", borderColor: "#5fcf80" }}
                    >
                      아이디 중복체크
                    </button>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="passwd"
                      placeholder="비밀번호"
                      className="form-control"
                      value={formData.passwd}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <DatePicker
                      selected={formData.birth}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="생년월일 선택"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="radio"
                        name="sex"
                        value="남"
                        checked={formData.sex === "남"}
                        onChange={handleChange}
                        style={{ marginRight: "5px" }}
                      />
                      남자
                    </label>
                    <label style={{ marginLeft: "20px" }}>
                      <input
                        type="radio"
                        name="sex"
                        value="여"
                        checked={formData.sex === "여"}
                        onChange={handleChange}
                        style={{ marginRight: "5px" }}
                      />
                      여자
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="hp1"
                      className="form-control d-inline-block"
                      value={formData.hp1}
                      onChange={handleChange}
                      style={{ width: "30%", display: "inline" }}
                      maxLength={3}
                    />{" "}
                    -
                    <input
                      type="text"
                      name="hp2"
                      className="form-control d-inline-block"
                      value={formData.hp2}
                      onChange={handleChange}
                      style={{ width: "30%", display: "inline" }}
                      maxLength={4}
                    />{" "}
                    -
                    <input
                      type="text"
                      name="hp3"
                      className="form-control d-inline-block"
                      value={formData.hp3}
                      onChange={handleChange}
                      style={{ width: "30%", display: "inline" }}
                      maxLength={4}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
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
