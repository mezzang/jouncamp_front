import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

function QnaReply({ originalQna, threadData, isLoggedIn }) {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [file1, setFile1] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/member/login");
    }
  }, [isLoggedIn, navigate]);

  const handleFileChange = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const content = editorRef.current?.getContent() || "";

    if (!name.trim()) {
      alert("작성자 이름을 입력해 주십시오.");
      return;
    }
    if (!subject.trim()) {
      alert("글 제목을 입력해 주십시오.");
      return;
    }
    if (!content.trim()) {
      alert("글 내용을 입력해 주십시오.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("parentNo", originalQna.no); // 답변 대상 글 번호
      formData.append("name", name);
      formData.append("subject", subject);
      formData.append("content", content);
      formData.append("tgroup", threadData.tgroup);
      formData.append("tdepth", threadData.tdepth);
      formData.append("tfloat", threadData.tfloat);
      if (file1) {
        formData.append("file1", file1);
      }

      await axios.post("/api/qna/reply", formData);
      alert("답변 작성이 완료되었습니다.");
      navigate("/qna");
    } catch (error) {
      console.error("답변 작성 실패:", error);
      alert("답변 작성에 실패했습니다.");
    }
  };

  return (
    <section className="course">
      <div className="container">
        <h2>질문과 답변 - 답변 작성</h2>

        <div className="form-group">
          <label>글쓴이</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "200px" }}
          />
        </div>

        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>내용</label>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table code help wordcount",
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
        </div>

        <div className="form-group">
          <label>첨부파일1</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={handleSubmit}>
            답변쓰기
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/qna")}
          >
            목록
          </button>
        </div>

        {/* 부모글 내용 표시 */}
        <div className="card-footer mt-5">
          <h5>
            <strong>{originalQna.name}</strong> 님의 질문글
          </h5>
          <p>{originalQna.subject}</p>
          <div>{originalQna.content}</div>
        </div>
      </div>
    </section>
  );
}

export default QnaReply;
