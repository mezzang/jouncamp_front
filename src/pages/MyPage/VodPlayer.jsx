// src/pages/MyPage/VodPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getVodInfo,
  updateAccessTime,
  updateCurrentTime,
} from "../../services/mypageService";

function VodPlayer() {
  const { vodId } = useParams();
  const [searchParams] = useSearchParams();
  const order_code = searchParams.get("order_code");

  const [vod, setVod] = useState(null);
  const [order, setOrder] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);
  const currentTime = useRef(0);
  const currentState = useRef("N");

  // 컴포넌트 마운트 시 VOD 정보 가져오기
  useEffect(() => {
    async function fetchVod() {
      try {
        const data = await getVodInfo(vodId, order_code);
        setVod(data.vod);
        setOrder(data.order);

        // 미디어 URL 구성
        const mediaServerUrl =
          data.media_server + "/" + data.media_folder + "/" + data.vod.Vod_file;
        setMediaUrl(mediaServerUrl);

        // 이어보기 여부 설정
        if (data.vodHistory && data.vodHistory.Current_time) {
          currentTime.current = data.vodHistory.Current_time;

          // lm_time 계산 (종료시간 60초 전)
          const lm_time = data.vod.Vod_time * 60 * 60 - 60;

          if (currentTime.current === 0 || currentTime.current > lm_time) {
            currentState.current = "N"; // 이어보기 실행 안함
          } else {
            currentState.current = "Y"; // 이어보기 실행함
          }
        }

        setLoading(false);

        // 1초 후 current_time 함수 실행 (이어보기 확인)
        setTimeout(() => current_time(), 1000);
      } catch (error) {
        console.error("VOD 정보 불러오기 실패:", error);
        setLoading(false);
      }
    }

    fetchVod();
  }, [vodId, order_code]);

  // 30초마다 access_time 호출
  useEffect(() => {
    if (!loading) {
      const timer = setInterval(() => access_time(), 30000);
      return () => clearInterval(timer);
    }
  }, [loading]);

  // 10분마다 시청 확인
  useEffect(() => {
    if (!loading) {
      const checkInterval = setInterval(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          if (
            window.confirm(
              "화면 영상을 잘 시청중이신가요 ? [10분마다 시청유도 확인]\n\n계속 시청을 원하시면 '확인'버튼을 눌러주세요."
            )
          ) {
            videoRef.current.play();
          }
        }
      }, 600000); // 10분

      return () => clearInterval(checkInterval);
    }
  }, [loading]);

  // 창 닫기 이벤트
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      currentTimeFunc();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [loading]);

  // 30초마다 수강 시간 업데이트
  function access_time() {
    if (order && vod) {
      updateAccessTime(vod.No, order.Order_code);
    }
  }

  // 이어보기 확인
  function current_time() {
    if (currentState.current === "Y") {
      if (
        window.confirm("이전 재생정보가 있습니다.\n\n이어보기 하시겠습니까?")
      ) {
        seek(currentTime.current);
      } else {
        play();
        return false;
      }
    } else {
      play();
      return false;
    }
  }

  // 영상 탐색
  function seek(s) {
    if (videoRef.current) {
      videoRef.current.currentTime = s;
      videoRef.current.play();
      videoRef.current.volume = 0.25;
    }
  }

  // 영상 재생
  function play() {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.volume = 0.25;
    }
  }

  // 현재 재생 시간 저장
  function currentTimeFunc() {
    if (videoRef.current && order && vod) {
      const currentTime1 = videoRef.current.currentTime;
      updateCurrentTime(vod.No, order.Order_code, currentTime1);
    }
  }

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!vod || !order) {
    return <div>VOD 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <body
      style={{ margin: 0, padding: 0 }}
      onContextMenu={() => false}
      onSelectStart={() => false}
      onDragStart={() => false}
    >
      <form name="f1" id="f1" method="post">
        <input type="hidden" name="order_code" value={order.Order_code} />
        <input type="hidden" name="vod_no" value={vod.No} />
      </form>

      <table width="100%" border="0" cellSpacing="0" cellPadding="0">
        <tr>
          <td width="100%" align="center" valign="top" bgcolor="#000000">
            <video
              id="video1"
              ref={videoRef}
              controls
              autoPlay
              width="100%"
              height="100%"
              loop
              poster=""
              controlsList="nodownload"
              volume="0.5"
            >
              <source src={mediaUrl} type="video/mp4" />
              현재의 브라우저는 지원하지 않습니다.
            </video>

            <div style={{ padding: "10px" }}>
              <table
                border="0"
                cellSpacing="0"
                cellPadding="0"
                style={{ display: "fixed" }}
              >
                <tr>
                  <td
                    height="35"
                    style={{ padding: "0 0 0 10px", color: "#FFFFFF" }}
                  >
                    {vod.Vod_title}
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>

      {/* 숨겨진 프레임 (원본 닷넷 코드와 동일하게 유지) */}
      <iframe
        src=""
        name="MAFrame"
        id="MAFrame"
        width="0"
        height="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        frameBorder="0"
      />
      <iframe
        src=""
        name="MAFrame2"
        id="MAFrame2"
        width="0"
        height="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        frameBorder="0"
      />
    </body>
  );
}

export default VodPlayer;
