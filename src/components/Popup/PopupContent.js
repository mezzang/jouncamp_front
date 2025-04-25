import React from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  width: ${(props) => props.width}px;
  margin: 0;
  padding: 0;
`;

const PopupImage = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 0;
`;

const PopupFooter = styled.div`
  width: 100%;
  display: flex;
  background-color: #000000;
`;

const TodayCloseButton = styled.img`
  width: 116px;
  height: 25px;
  cursor: pointer;
`;

const CloseButton = styled.img`
  width: 54px;
  height: 25px;
  cursor: pointer;
`;

const PopupContent = ({ popup, onClose, onCloseToday }) => {
  return (
    <PopupContainer width={popup.width}>
      <div>
        {popup.url ? (
          <a href={popup.url} target="_blank" rel="noopener noreferrer">
            <PopupImage
              src={`/files/Popup/${popup.filename1}`}
              width={popup.width}
              height={popup.height}
              alt={popup.title}
            />
          </a>
        ) : (
          <PopupImage
            src={`/files/Popup/${popup.filename1}`}
            width={popup.width}
            height={popup.height}
            alt={popup.title}
          />
        )}
      </div>
      <PopupFooter>
        <div>
          <TodayCloseButton
            src="/img/popup/btn_today_stop.gif"
            onClick={() => onCloseToday(popup.no)}
            alt="오늘 하루 열지 않음"
          />
        </div>
        <div>
          <CloseButton
            src="/img/popup/btn_close.gif"
            onClick={() => onClose(popup.no)}
            alt="닫기"
          />
        </div>
      </PopupFooter>
    </PopupContainer>
  );
};

export default PopupContent;
