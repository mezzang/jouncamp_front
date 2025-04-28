// src/pages/notice/NoticeWrite.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NoticeWrite() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    subject: "",
    content: "",
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value); // 경로 표시용
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.subject || !form.content) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("subject", form.subject);
    formData.append("content", form.content);
    if (file) {
      formData.append("userfile1", file);
    }

    try {
      await axios.post("/api/notice", formData);
      alert("공지사항이 등록되었습니다.");
      navigate("/notice");
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
      alert("등록 실패");
    }
  };

  return (
    <section className="course">
      <div className="container">
        <h2>공지사항 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>글쓴이</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              style={{ width: "200px" }}
            />
          </div>

          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>내용</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="form-control"
              rows="6"
            />
          </div>

          <div className="form-group">
            <label>첨부파일1</label>
            <input
              type="text"
              value={fileName}
              readOnly
              className="form-control mb-2"
              placeholder="png, jpg, gif 파일만 업로드"
              style={{ width: "500px" }}
            />
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-secondary mx-2">
              글쓰기
            </button>
            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={() => navigate("/notice")}
            >
              목록
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NoticeWrite;
