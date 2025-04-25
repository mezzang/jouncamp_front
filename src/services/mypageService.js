import api from "./api";

export const getCourseDetail = (orderCode) => {
  return api.get(`/api/mypage/course/${orderCode}`);
};

export const getMyCourses = () => {
  return api.get("/api/mypage/courses");
};

export default {
  getCourseDetail,
  getMyCourses,
};
