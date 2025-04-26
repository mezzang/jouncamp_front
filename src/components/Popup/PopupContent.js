import React from "react";
import styled from "styled-components";

const PopupTable = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin: 0;
  padding: 0;
  background-image: url("/files/Popup/${(props) => props.image}");
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PopupContent = styled.div`
  flex: 1;
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

const PopupWrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const PopupContentComponent = ({ popup, onClose, onCloseToday }) => {
  const PopupInner = () => (
    <PopupTable
      width={popup.width}
      height={popup.height}
      image={popup.filename1}
    >
      <PopupContent dangerouslySetInnerHTML={{ __html: popup.memo }} />
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
    </PopupTable>
  );

  return (
    <PopupWrapper>
      {popup.url ? (
        <a href={popup.url} target="_blank" rel="noopener noreferrer">
          <PopupInner />
        </a>
      ) : (
        <PopupInner />
      )}
    </PopupWrapper>
  );
};

export default PopupContentComponent;
