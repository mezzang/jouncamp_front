// src/pages/MyPage/MyLectureDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyLectureDetail } from "../../services/mypageService"; // 서비스 함수 나중에 만들 거야

function MyLectureDetail() {
  const { id } = useParams(); // URL의 orderId를 받아옴
  const [lecture, setLecture] = useState(null); // 수강 주문 정보
  const [vods, setVods] = useState([]); // 강의 영상 목록
  const [vodHistoryList, setVodHistoryList] = useState([]); // 수강 기록
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLectureDetail() {
      try {
        const data = await getMyLectureDetail(id);
        setLecture(data.order);
        setVods(data.vods);
        setVodHistoryList(data.vodHistoryList);
      } catch (error) {
        console.error("강의 상세정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLectureDetail();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!lecture) {
    return <div>강의 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <h2>내 강의실</h2>
          <p>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
          </p>
        </div>
      </div>

      {/* Lecture Detail Header */}
      <section id="cource-details-tabs" className="cource-details-tabs mt-4">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
            <div className="container-fluid" style={{ background: "#fff" }}>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo01"
              >
                <a
                  className="navbar-brand"
                  href="#"
                  style={{ fontWeight: "bold" }}
                >
                  {lecture.lecName} ({lecture.lecStart} ~ {lecture.lecEnd})
                </a>
              </div>
            </div>
          </nav>

          {/* VOD 테이블 (다음 단계에서 채움) */}
          <div className="row">
            <table className="table table-hover table-bordered">
              <thead>
                <tr className="text-center">
                  <th>번호</th>
                  <th>목차</th>
                  <th>강의보기</th>
                  <th>교재다운</th>
                  <th>진도율</th>
                  <th>재생시간</th>
                  <th>퀴즈</th>
                  <th>설문조사</th>
                </tr>
              </thead>
              <tbody>
                {vods.length > 0 ? (
                  vods.map((vod, index) => {
                    const vodViewer = vod.vodViewer
                      ? vod.vodViewer.split("*")
                      : [];
                    const vodSize1 = vodViewer[0] || "";
                    const vodSize2 = vodViewer[1] || "";

                    const youtubeSize = vod.youtubeSize
                      ? vod.youtubeSize.split("*")
                      : [];
                    const youtubeSize1 = youtubeSize[0] || "";
                    const youtubeSize2 = youtubeSize[1] || "";

                    const viewRateObj = vodHistoryList.find(
                      (history) => history.vodNo === vod.no
                    );
                    let viewRate = 0;
                    if (viewRateObj && vod.vodTime > 0) {
                      viewRate = Math.floor(
                        (viewRateObj.stayTime / (vod.vodTime * 60)) * 100
                      );
                    }

                    return (
                      <tr
                        key={vod.no}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f5f5f5")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "")
                        }
                        style={{ height: "40px" }}
                      >
                        <td className="text-center" style={{ padding: "5px" }}>
                          {vod.vodNum}
                          {vod.numStr && (
                            <div style={{ color: "#7c7c7c" }}>{vod.numStr}</div>
                          )}
                        </td>

                        <td style={{ padding: "5px" }}>
                          <span style={{ color: "#000" }}>{vod.vodTitle}</span>
                          {vod.vodStr && (
                            <div style={{ color: "#cccccc" }}>{vod.vodStr}</div>
                          )}
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          {vod.vodFile && (
                            <button
                              className="btn btn-sm btn-secondary m-1"
                              style={{ background: "#AD794E", color: "#fff" }}
                              onClick={() =>
                                vodView(
                                  lecture.orderCode,
                                  vod.no,
                                  vodSize1,
                                  vodSize2
                                )
                              }
                            >
                              VOD 보기
                            </button>
                          )}
                          {vod.youtube && (
                            <a
                              href={vod.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-secondary m-1"
                              style={{ background: "#A287C9", color: "#fff" }}
                            >
                              YouTube
                            </a>
                          )}
                          {vod.youtubeLive && (
                            <a
                              href={vod.youtubeLive}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-secondary m-1"
                              style={{ background: "#FF6666", color: "#fff" }}
                            >
                              Live
                            </a>
                          )}
                          {vod.zoom && (
                            <a
                              href={vod.zoom}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-secondary m-1"
                              style={{ background: "#5487ad", color: "#fff" }}
                            >
                              Zoom
                            </a>
                          )}
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          {vod.vodBook ? (
                            <a
                              href={`${lecture.mediaServer}/${lecture.bookFolder}/${vod.vodBook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              교재 다운로드
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          {viewRate}%
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          {vod.vodTime} 분
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          -
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          -
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      등록된 강의영상이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function vodView(orderCode, no, size1, size2) {
  const winl = (window.screen.width - size1) / 2;
  const wint = (window.screen.height - size2) / 2;
  const vWidth = parseInt(size1) + 20;
  const vHeight = parseInt(size2) + 30;

  window.open(
    `/mypage/vodplayer/${no}?order_code=${orderCode}`,
    "vodPlayer",
    `width=${vWidth},height=${vHeight},scrollbars=yes,resizable=0,left=${winl},top=0,location=no`
  );
}

export default MyLectureDetail;
