import React from "react";

function PopupImage({ popup }) {
  const { no, title, url, filename1, width, height } = popup;

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

  const image = (
    <img
      src={`/files/Popup/${filename1}`}
      width={width}
      height={height}
      alt={title}
      style={{ border: 0 }}
    />
  );

  return (
    <html>
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <table width={width}>
          <tbody>
            <tr>
              <td>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {image}
                  </a>
                ) : (
                  image
                )}
              </td>
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
                          alt="오늘 하루 닫기"
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
      </body>
    </html>
  );
}

export default PopupImage;
