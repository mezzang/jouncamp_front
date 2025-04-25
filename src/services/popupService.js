import api from "./api";

export const getPopups = () => {
  return api.get("/api/popups");
};

export const getPopupContent = (id) => {
  return api.get(`/api/popups/${id}`);
};

export default {
  getPopups,
  getPopupContent,
};
