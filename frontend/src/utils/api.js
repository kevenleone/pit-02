import axios from 'axios';

const { REACT_APP_API_BASE_URL } = process.env;

const myAxios = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: {
    Authorization: 'bearer',
  },
});

export default myAxios;
