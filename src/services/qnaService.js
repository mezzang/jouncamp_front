import api from "./api";

export const getQnaDetail = (id) => {
  return api.get(`/api/qna/${id}`);
};

export const getQnaList = (params) => {
  return api.get("/api/qna", { params });
};

export const writeQna = (formData) => {
  return api.post("/api/qna/write", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteQna = (id) => {
  return api.delete(`/api/qna/${id}`);
};

export default {
  getQnaDetail,
  getQnaList,
  writeQna,
  deleteQna,
};

export const modifyQna = (id, formData) => {
  return api.post(`/api/qna/mod/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const replyQna = (formData) => {
  return api.post("/api/qna/reply", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
