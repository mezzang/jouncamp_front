// src/pages/MyPage/MyLectureDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMyLectureDetail } from "../../services/mypageService";

function MyLectureDetail() {
  const { id } = useParams(); // URL의 orderId를 받아옴
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("Page")) || 1;
  const searchField = queryParams.get("SearchField") || "";
  const searchQuery = queryParams.get("SearchQuery") || "";

  const [order, setOrder] = useState(null); // JcOrder 모델과 일치하도록 변수명 변경
  const [vods, setVods] = useState([]);
  const [vodHistoryList, setVodHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLectureDetail() {
      try {
        const data = await getMyLectureDetail(
          id,
          page,
          searchField,
          searchQuery
        );
        setOrder(data.order);
        setVods(data.vods);
        setVodHistoryList(data.vodHistoryList);
      } catch (error) {
        console.error("강의 상세정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLectureDetail();
  }, [id, page, searchField, searchQuery]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!order) {
    return <div>강의 정보를 불러올 수 없습니다.</div>;
  }

  // 강의 정보
  const lecture = order.JcLecture;
  const media_server = lecture.Media_server;
  const media_root = lecture.Media_root;
  const media_folder = lecture.Media_folder;
  const Book_folder = lecture.Book_folder;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <h2>내 강의실</h2>
          <p>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.
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
                  {order.Lec_name} ({order.Lec_start} ~ {order.Lec_end})
                </a>
              </div>
            </div>
          </nav>

          {/* VOD 테이블 */}
          <div className="row">
            <table className="table table-hover table-bordered">
              <thead>
                <tr className="text-center">
                  <th scope="col" style={{ padding: "5px" }}>
                    번호
                  </th>
                  <th scope="col" style={{ padding: "5px" }}>
                    목차
                  </th>
                  <th scope="col" style={{ padding: "5px" }}>
                    강의보기
                  </th>
                  <th scope="col" style={{ padding: "5px" }}>
                    교재다운
                  </th>
                  <th scope="col" style={{ padding: "5px" }}>
                    진도율
                  </th>
                  <th scope="col" style={{ padding: "5px" }}>
                    재생시간
                  </th>
                  <th scope="col" style={{ padding: "5px" }}>
                    퀴즈
                  </th>
                  <th scope="col" style={{ padding: "5px" }}>
                    설문조사
                  </th>
                </tr>
              </thead>
              <tbody>
                {vods.length > 0 ? (
                  vods.map((vod) => {
                    // 강의 영상 파일 버튼
                    let vod_fileStr = "";
                    if (vod.Vod_file) {
                      const vod_size1 = vod.Vod_viewer
                        ? vod.Vod_viewer.split("*")[0]
                        : "";
                      const vod_size2 = vod.Vod_viewer
                        ? vod.Vod_viewer.split("*")[1]
                        : "";
                      vod_fileStr = (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            vodView(
                              order.Order_code,
                              vod.No,
                              vod_size1,
                              vod_size2
                            );
                          }}
                          style={{
                            background: "#AD794E",
                            color: "#fff",
                            padding: "2px",
                          }}
                        >
                          View
                        </a>
                      );
                    }

                    // 유튜브 버튼
                    let youtubeStr = "";
                    if (vod.Youtube) {
                      youtubeStr = (
                        <a
                          href={vod.Youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "#A287C9",
                            color: "#fff",
                            padding: "2px",
                            marginLeft: "2px",
                          }}
                        >
                          View
                        </a>
                      );
                    }

                    // 유튜브 라이브 버튼
                    let youtubeLiveStr = "";
                    if (vod.Youtube_live) {
                      youtubeLiveStr = (
                        <a
                          href={vod.Youtube_live}
                          style={{
                            background: "#FF6666",
                            color: "#fff",
                            padding: "2px",
                            marginLeft: "2px",
                          }}
                        >
                          Live
                        </a>
                      );
                    }

                    // 줌 버튼
                    let zoomStr = "";
                    if (vod.Zoom) {
                      zoomStr = (
                        <a
                          href={vod.Zoom}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "#5487ad",
                            color: "#fff",
                            padding: "2px",
                            marginLeft: "2px",
                          }}
                        >
                          Click
                        </a>
                      );
                    }

                    // 교재 다운로드 버튼
                    let vod_bookStr = "";
                    if (vod.Vod_book) {
                      vod_bookStr = (
                        <a
                          href={`${media_server}/${Book_folder}/${vod.Vod_book}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          교재다운
                        </a>
                      );
                    }

                    // 진도율 계산
                    let view_rate = 0;
                    for (const vodhistory of vodHistoryList) {
                      if (vod.No === vodhistory.Vod_no) {
                        view_rate = vodhistory.Stay_time;
                        break;
                      }
                    }

                    if (vod.Vod_time > 0) {
                      view_rate = Math.floor(
                        (view_rate / (vod.Vod_time * 60)) * 100
                      );
                    } else {
                      view_rate = 0;
                    }

                    return (
                      <tr
                        key={vod.No}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f5f5f5")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "")
                        }
                        style={{ height: "40px" }}
                      >
                        <td className="text-center" style={{ padding: "5px" }}>
                          {vod.Vod_num}
                          {vod.Num_str && (
                            <>
                              <br />{" "}
                              <span style={{ color: "#7c7c7c" }}>
                                {vod.Num_str}
                              </span>
                            </>
                          )}
                        </td>

                        <td style={{ padding: "5px" }}>
                          <a href="#" style={{ color: "#000" }}>
                            {vod.Vod_title}
                          </a>
                          {vod.Vod_str && (
                            <>
                              <br />{" "}
                              <span style={{ color: "#cccccc" }}>
                                {vod.Vod_str}
                              </span>
                            </>
                          )}
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          {vod_fileStr} {youtubeStr} {youtubeLiveStr} {zoomStr}
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          {vod_bookStr}
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          {view_rate} %
                        </td>

                        <td className="text-center" style={{ padding: "5px" }}>
                          {vod.Vod_time} 분
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

// vodView 함수 - 원본 닷넷 코드와 동일한 구현
function vodView(order_code, no, size1, size2) {
  const winl = (window.screen.width - size1) / 2;
  const wint = (window.screen.height - size2) / 2;

  const vWidth = parseInt(size1) + 20;
  const vHeight = parseInt(size2) + 30;

  window.open(
    `/Mypage/VodPlayer/${no}?order_code=${order_code}`,
    "vodPlayer",
    `width=${vWidth},height=${vHeight},scrollbars=yes,resizable=0,left=${winl},top=0,location=no`
  );
}

export default MyLectureDetail;
