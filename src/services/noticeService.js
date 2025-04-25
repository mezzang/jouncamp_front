import api from "./api";

export const getNoticeDetail = (id) => {
  return api.get(`/api/notice/${id}`);
};

export const getNoticeList = (params) => {
  return api.get("/api/notice", { params });
};

export default {
  getNoticeDetail,
  getNoticeList,
};

export const writeNotice = (formData) => {
  return api.post("/api/notice/write", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
