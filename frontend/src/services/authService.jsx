import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/login`, data);
};

export const registerUser = async (data) => {
  return await axios.post(`${API_URL}/register`, data);
};
