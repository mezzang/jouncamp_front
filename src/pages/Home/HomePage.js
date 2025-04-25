import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// 스타일 컴포넌트 정의
const PopupContainer = styled.div`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  z-index: 9999;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  border: 0px solid #fff;
`;

const PopupIframe = styled.iframe`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height + 20}px;
  border: none;
  scrolling: no;
`;

// 홈페이지 컴포넌트
const HomePage = () => {
  const [popups, setPopups] = useState([]);
  const [popupVisibility, setPopupVisibility] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 팝업 정보 가져오기
    const fetchPopups = async () => {
      try {
        const response = await axios.get("/api/popups");
        setPopups(response.data);

        // 팝업 가시성 초기화
        const initialVisibility = {};
        response.data.forEach((popup) => {
          const cookieName = `maindiv${popup.no}`;
          initialVisibility[popup.no] = !getCookie(cookieName);
        });
        setPopupVisibility(initialVisibility);
      } catch (error) {
        console.error("팝업 정보 가져오기 오류:", error);
      }
    };

    fetchPopups();

    // URL에서 메시지 파라미터 확인
    const params = new URLSearchParams(window.location.search);
    const msgParam = params.get("message");
    if (msgParam) {
      setMessage(decodeURIComponent(msgParam));
    }
  }, []);

  // 메시지 표시
  useEffect(() => {
    if (message) {
      alert(message);
      setMessage("");
    }
  }, [message]);

  // 쿠키 설정 함수
  const setCookie = (name, value, expiredays) => {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie =
      name +
      "=" +
      escape(value) +
      "; path=/; expires=" +
      todayDate.toGMTString() +
      ";";
  };

  // 쿠키 가져오기 함수
  const getCookie = (name) => {
    const cookieData = document.cookie;
    const start = cookieData.indexOf(name + "=");
    let cookieValue = "";

    if (start !== -1) {
      const cookieStart = start + name.length + 1;
      let cookieEnd = cookieData.indexOf(";", cookieStart);
      if (cookieEnd === -1) cookieEnd = cookieData.length;
      cookieValue = cookieData.substring(cookieStart, cookieEnd);
    }

    return unescape(cookieValue);
  };

  // 팝업 닫기 (하루동안 열지 않음)
  const closeWin = (no) => {
    setCookie(`maindiv${no}`, "done", 1);
    setPopupVisibility((prev) => ({
      ...prev,
      [no]: false,
    }));
  };

  // 팝업 닫기 (쿠키 저장하지 않음)
  const noCloseWin = (no) => {
    setPopupVisibility((prev) => ({
      ...prev,
      [no]: false,
    }));
  };

  return (
    <>
      {/* 팝업들 */}
      {popups.map((popup) => (
        <PopupContainer
          key={popup.no}
          id={`divpop${popup.no}`}
          x={popup.positionX}
          y={popup.positionY}
          visible={popupVisibility[popup.no]}
        >
          <PopupIframe
            src={`/Popup/Index/${popup.no}`}
            name={`popframe${popup.no}`}
            id={`popframe${popup.no}`}
            width={popup.width}
            height={popup.height}
            frameBorder="0"
          />
        </PopupContainer>
      ))}

      {/* 홈페이지 내용 */}
      <div>{/* 여기에 홈페이지 본문 내용 */}</div>
    </>
  );
};

export default HomePage;
