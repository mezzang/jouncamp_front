import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

// 스타일 컴포넌트 정의
const PlayerContainer = styled.div`
  margin: 0;
  padding: 0;
  background-color: #000;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const VideoContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 50px);
`;

const TitleBar = styled.div`
  padding: 10px;
  color: #fff;
  width: 100%;
  height: 35px;
`;

const HiddenIframe = styled.iframe`
  width: 0;
  height: 0;
  border: 0;
  display: none;
`;

// VOD 플레이어 컴포넌트
const VodPlayer = () => {
  const { vodNo } = useParams();
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get("order_code");
  const [vod, setVod] = useState(null);
  const [order, setOrder] = useState(null);
  const [vodHistory, setVodHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mediaUrl, setMediaUrl] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [currentState, setCurrentState] = useState("N");
  const videoRef = useRef(null);

  // 타이머 참조를 위한 refs
  const accessTimeTimerRef = useRef(null);
  const currentTimeTimerRef = useRef(null);
  const confirmTimerRef = useRef(null);

  useEffect(() => {
    // VOD 플레이어 정보 가져오기
    const fetchVodPlayer = async () => {
      try {
        const response = await axios.get(`/api/mypage/vodplayer/${vodNo}`, {
          params: { order_code: orderCode },
        });

        setVod(response.data.vod);
        setOrder(response.data.order);
        setVodHistory(response.data.vodHistory);

        // 미디어 URL 설정
        const mediaServer = response.data.media_server;
        const mediaFolder = response.data.media_folder;
        const vodFile = response.data.vod.vod_file;
        setMediaUrl(`${mediaServer}/${mediaFolder}/${vodFile}`);

        // 현재 시간 및 상태 설정
        if (response.data.vodHistory) {
          setCurrentTime(response.data.vodHistory.current_time);
        }

        // 이어보기 상태 설정
        const vodTime = response.data.vod.vod_time;
        const lmTime = vodTime * 60 * 60 - 60; // 종료시간에서 60초 전

        if (response.data.vodHistory) {
          const historyTime = response.data.vodHistory.current_time;
          if (historyTime === 0 || historyTime > lmTime) {
            setCurrentState("N"); // 이어보기 실행 안함
          } else {
            setCurrentState("Y"); // 이어보기 실행함
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("VOD 플레이어 정보 가져오기 오류:", error);
        setLoading(false);
      }
    };

    fetchVodPlayer();

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (accessTimeTimerRef.current) clearTimeout(accessTimeTimerRef.current);
      if (currentTimeTimerRef.current)
        clearTimeout(currentTimeTimerRef.current);
      if (confirmTimerRef.current) clearInterval(confirmTimerRef.current);

      // 페이지 이탈 시 현재 시간 저장
      saveCurrentTime();
    };
  }, [vodNo, orderCode]);

  // 현재 시간 저장 함수
  const saveCurrentTime = () => {
    if (videoRef.current && vod) {
      const currentVideoTime = videoRef.current.currentTime;
      axios
        .post(`/api/mypage/vodplayer/currentTime/${vod.no}`, {
          order_code: orderCode,
          current_time: currentVideoTime,
        })
        .catch((error) => {
          console.error("현재 시간 저장 오류:", error);
        });
    }
  };

  // 시청 시간 기록 함수
  const accessTime = () => {
    axios
      .get(`/api/mypage/vodplayer/time/${vod.no}`, {
        params: { order_code: orderCode },
      })
      .catch((error) => {
        console.error("시청 시간 기록 오류:", error);
      });

    accessTimeTimerRef.current = setTimeout(accessTime, 30000);
  };

  // 이어보기 처리 함수
  const handleCurrentTime = () => {
    if (currentState === "Y") {
      if (
        window.confirm("이전 재생정보가 있습니다.\n\n이어보기 하시겠습니까?")
      ) {
        seek(currentTime);
      } else {
        if (videoRef.current) {
          videoRef.current.play();
          videoRef.current.volume = 0.25;
        }
      }
    } else {
      if (videoRef.current) {
        videoRef.current.play();
        videoRef.current.volume = 0.25;
      }
    }
  };

  // 특정 시간으로 이동 함수
  const seek = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      videoRef.current.volume = 0.25;
    }
  };

  // 비디오 로드 완료 후 처리
  useEffect(() => {
    if (!loading && videoRef.current) {
      // 초기 타이머 설정
      accessTimeTimerRef.current = setTimeout(accessTime, 30000);
      currentTimeTimerRef.current = setTimeout(handleCurrentTime, 1000);

      // 10분마다 시청 유도 확인
      confirmTimerRef.current = setInterval(() => {
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
      }, 600000); // 10분마다 실행

      // beforeunload 이벤트 처리
      window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
        saveCurrentTime();
      });
    }
  }, [loading]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!vod || !order) {
    return <div>VOD 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <PlayerContainer
      onContextMenu={(e) => e.preventDefault()}
      onSelectStart={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <form name="f1" id="f1" method="post">
        <input type="hidden" name="order_code" value={order.order_code} />
        <input type="hidden" name="vod_no" value={vod.no} />
      </form>

      <VideoContainer>
        <Video
          id="video1"
          ref={videoRef}
          controls
          autoPlay
          loop
          controlsList="nodownload"
        >
          <source src={mediaUrl} type="video/mp4" />
          현재의 브라우저는 지원하지 않습니다.
        </Video>
      </VideoContainer>

      <TitleBar>{vod.vod_title}</TitleBar>

      {/* Hidden iframes for background communication */}
      <HiddenIframe name="MAFrame" id="MAFrame" />
      <HiddenIframe name="MAFrame2" id="MAFrame2" />
    </PlayerContainer>
  );
};

export default VodPlayer;
