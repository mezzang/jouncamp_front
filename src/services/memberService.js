import api from "./api";

export const idCheck = (idStr) => {
  return api.post("/api/member/idCheck", { idStr });
};

export const register = (userData) => {
  return api.post("/api/member/register", userData);
};

export default {
  idCheck,
  register,
};
