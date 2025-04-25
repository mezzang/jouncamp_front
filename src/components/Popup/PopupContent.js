import React from "react";
import styled from "styled-components";

const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid #ccc;
  overflow: hidden;
`;

const PopupContent = styled.div`
  padding: 10px;
  height: calc(100% - 40px);
  overflow: auto;
`;

const PopupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

// 팝업 컴포넌트
const Popup = ({ content, onClose, onCloseToday }) => {
  return (
    <PopupWrapper>
      <PopupContent dangerouslySetInnerHTML={{ __html: content }} />
      <PopupFooter>
        <CloseButton onClick={onCloseToday}>오늘 하루 열지 않음</CloseButton>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </PopupFooter>
    </PopupWrapper>
  );
};

export default Popup;
