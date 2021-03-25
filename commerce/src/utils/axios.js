import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:3333/api",
});

myAxios.interceptors.request.use((request) => {
  request.headers.Authorization = `bearer ${localStorage.getItem("@token")}`;

  return request;
});

export default myAxios;
