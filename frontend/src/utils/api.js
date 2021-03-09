import axios from 'axios';
import { tokenKey } from './constants';

const { REACT_APP_API_BASE_URL } = process.env;

const myAxios = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
});

myAxios.interceptors.request.use((request) => {
  request.headers.Authorization = `bearer ${localStorage.getItem(tokenKey)}`;

  return request;
});

export default myAxios;
