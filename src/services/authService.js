import api from "./api";

export const login = (credentials) => {
  return api.post("/api/member/login", credentials);
};

export const logout = () => {
  return api.post("/api/member/logout");
};

export const checkLoginStatus = () => {
  return api.get("/api/member/checkLogin");
};

export default {
  login,
  logout,
  checkLoginStatus,
};
