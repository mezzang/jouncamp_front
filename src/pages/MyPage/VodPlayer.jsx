import React, { useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getVodInfo,
  updateAccessTime,
  updateCurrentTime,
} from "../../services/mypageService"; // 서비스 함수

function VodPlayer() {
  const { vodId } = useParams();
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get("order_code");

  const videoRef = useRef(null);
  const currentTimeRef = useRef(0);
  const currentState = useRef("N"); // 이어보기 여부
  const initialTime = useRef(0); // 이어볼 위치

  useEffect(() => {
    async function fetchVod() {
      try {
        const data = await getVodInfo(vodId, orderCode);

        if (
          data.vodHistory &&
          data.vodHistory.currentTime > 0 &&
          data.vodHistory.currentTime < data.vod.vodTime * 60
        ) {
          currentState.current = "Y";
          initialTime.current = data.vodHistory.currentTime;
        }

        setTimeout(() => handleInitialPlay(), 1000); // 1초 후 이어보기 확인
      } catch (error) {
        console.error("VOD 정보 불러오기 실패:", error);
      }
    }

    fetchVod();
  }, [vodId, orderCode]);

  function handleInitialPlay() {
    const video = videoRef.current;
    if (!video) return;

    if (currentState.current === "Y") {
      if (
        window.confirm("이전 재생정보가 있습니다.\n\n이어보기 하시겠습니까?")
      ) {
        video.currentTime = initialTime.current;
      }
    }
    video.play();
    video.volume = 0.25;
  }

  // 30초마다 수강중 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      updateAccessTime(vodId, orderCode);
    }, 30000);

    return () => clearInterval(interval);
  }, [vodId, orderCode]);

  // 10분마다 시청확인
  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        if (window.confirm("화면 영상을 잘 시청중이신가요? (10분마다 확인)")) {
          video.play();
        }
      }
    }, 600000); // 10분

    return () => clearInterval(interval);
  }, []);

  // 창 닫을 때 현재 시간 서버로 전송
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const video = videoRef.current;
      if (video) {
        currentTimeRef.current = video.currentTime;
        updateCurrentTime(vodId, orderCode, currentTimeRef.current);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [vodId, orderCode]);

  return (
    <div style={{ backgroundColor: "#000", height: "100vh" }}>
      <video
        ref={videoRef}
        controls
        autoPlay
        width="100%"
        height="100%"
        style={{ objectFit: "contain" }}
        controlsList="nodownload"
      >
        {/* src는 getVodInfo API로 받아와서 추가 */}
        <source src="/media/sample.mp4" type="video/mp4" />
        현재 브라우저는 비디오 재생을 지원하지 않습니다.
      </video>
    </div>
  );
}

export default VodPlayer;
