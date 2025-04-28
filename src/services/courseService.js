import axios from "axios";

// 서버 기본 URL 설정 (나중에 필요에 따라 수정 가능)
const API_URL = "http://localhost:5000"; // 예시: 백엔드 API 서버 주소

// 강의 목록 가져오기
export const getLectures = async () => {
  const response = await axios.get(`${API_URL}/api/courses`);
  return response.data;
};

// 특정 강의 상세 정보 가져오기
export const getLectureDetail = async (id) => {
  const response = await axios.get(`${API_URL}/api/courses/${id}`);
  return response.data;
};

// 특정 강의의 VOD 목록 가져오기 (별도 API가 있는 경우)
export const getLectureVods = async (id) => {
  const response = await axios.get(`${API_URL}/api/courses/${id}/vods`);
  return response.data;
};
