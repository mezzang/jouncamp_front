import axios from "axios";

// 1. VOD 기본 정보 가져오기
export async function getVodInfo(vodId, orderCode) {
  try {
    const response = await axios.get(`/api/mypage/vod/${vodId}`, {
      params: {
        order_code: orderCode,
      },
    });
    return response.data;
  } catch (error) {
    console.error("getVodInfo 실패:", error);
    throw error;
  }
}

// 2. 30초마다 수강중 상태 서버에 알리기
export async function updateAccessTime(vodId, orderCode) {
  try {
    await axios.post("/api/mypage/vod/access-time", {
      vodId,
      orderCode,
    });
  } catch (error) {
    console.error("updateAccessTime 실패:", error);
  }
}

// 3. 현재 재생시간 저장하기 (창 닫을 때)
export async function updateCurrentTime(vodId, orderCode, currentTime) {
  try {
    await axios.post("/api/mypage/vod/current-time", {
      vodId,
      orderCode,
      currentTime,
    });
  } catch (error) {
    console.error("updateCurrentTime 실패:", error);
  }
}

// ① 추가: 내 강의 목록 가져오기
export async function getMyCourses(page = 1) {
  try {
    const response = await axios.get(`/api/mypage/courses`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("getMyCourses 실패:", error);
    throw error;
  }
}

// ② 추가: 내 강의 상세(수강 과목의 VOD 목록) 가져오기
export async function getMyLectureDetail(courseId, page = 1) {
  try {
    const response = await axios.get(`/api/mypage/courses/${courseId}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("getMyLectureDetail 실패:", error);
    throw error;
  }
}
