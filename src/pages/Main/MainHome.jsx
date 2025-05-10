// src/pages/Main/MainHome.jsx
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function PopupLayer({ popup }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cookieKey = `maindiv${popup.no}`;
    if (Cookies.get(cookieKey) === "done") {
      setVisible(false);
    }
  }, [popup.no]);

  const handleClose = () => {
    const cookieKey = `maindiv${popup.no}`;
    Cookies.set(cookieKey, "done", { expires: 1 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id={`divpop${popup.no}`}
      style={{
        position: "absolute",
        left: `${popup.positionX}px`,
        top: `${popup.positionY}px`,
        zIndex: 9999,
        visibility: "visible",
        border: "0px solid #fff",
      }}
    >
      <iframe
        src={`/popup/index/${popup.no}`}
        name={`popframe${popup.no}`}
        width={popup.width}
        height={popup.height + 20}
        frameBorder="0"
        scrolling="no"
        title={`popup-${popup.no}`}
      ></iframe>
      <div className="text-end mt-1">
        <button className="btn btn-sm btn-secondary" onClick={handleClose}>
          하루 보지 않기
        </button>
      </div>
    </div>
  );
}

function MainHome() {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    axios.get("/api/popup/list").then((res) => {
      setPopups(res.data);
    });
  }, []);

  return (
    <section className="main-home">
      <div className="breadcrumbs">
        <div className="container">
          <h2>조은캠프 LMS 소개</h2>
          <p>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis.
          </p>
        </div>
      </div>

      <section className="section section-shaped section-lg">
        <div className="container">
          <h3>Jouncamp LMS 소개페이지입니다.</h3>
        </div>
      </section>

      {popups.map((popup) => (
        <PopupLayer key={popup.no} popup={popup} />
      ))}
    </section>
  );
}

export default MainHome;
