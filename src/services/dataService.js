import api from "./api";

export const getDataDetail = (id) => {
  return api.get(`/api/data/${id}`);
};

export const getDataList = (page, searchField, searchQuery) => {
  return api.get("/api/data", {
    params: { page, searchField, searchQuery },
  });
};

export default {
  getDataDetail,
  getDataList,
};
