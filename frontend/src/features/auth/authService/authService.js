import axios from "axios";

const API_URL = "/api/user/register";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (userData) => {
  const response = await axios.post("/api/user/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data.data;
};
const logout = () => {
  localStorage.removeItem("user");
};

const serviceAuth = {
  register,
  login,
  logout,
};

export default serviceAuth;
