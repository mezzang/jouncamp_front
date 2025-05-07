// src/pages/Popup/PopupContent.jsx
import React from "react";
import "./PopupContent.css"; // 스타일 분리 가능

function PopupContent({ popup }) {
  const { no, title, url, memo, filename1, width, height } = popup;

  const handleCloseToday = () => {
    if (window.parent?.closeWin10) {
      window.parent.closeWin10(no);
    }
  };

  const handleClose = () => {
    if (window.parent?.nocloseWin10) {
      window.parent.nocloseWin10(no);
    }
  };

  const popupStyle = {
    backgroundImage: `url(/files/Popup/${filename1})`,
    backgroundRepeat: "no-repeat",
    width: `${width}px`,
    height: `${height}px`,
  };

  const content = (
    <table style={popupStyle} className="popup">
      <tbody>
        <tr>
          <td dangerouslySetInnerHTML={{ __html: memo }} />
        </tr>
        <tr>
          <td>
            <table width="100%">
              <tbody>
                <tr>
                  <td style={{ backgroundColor: "#000000" }}>
                    <img
                      src="/img/popup/btn_today_stop.gif"
                      width="116"
                      height="25"
                      alt="오늘 하루 보지 않기"
                      onClick={handleCloseToday}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td width="54" style={{ backgroundColor: "#000000" }}>
                    <img
                      src="/img/popup/btn_close.gif"
                      alt="닫기"
                      onClick={handleClose}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          content
        )}
      </body>
    </html>
  );
}

export default PopupContent;
