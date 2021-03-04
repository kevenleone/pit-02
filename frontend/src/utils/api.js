import axios from 'axios';

const { REACT_APP_API_BASE_URL } = process.env;

const myAxios = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: {
    Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNlZGU4NmE2ZDZjMGI1OTU4MWJhYmQiLCJuYW1lIjoia2V2ZW4iLCJlbWFpbCI6ImtldmVuQGhvdG1haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMS0wMy0wM1QwMDo1NTozNC4xNDhaIiwidXBkYXRlZEF0IjoiMjAyMS0wMy0wM1QwMDo1NTozNC4xNDhaIiwiX192IjowLCJpYXQiOjE2MTQ4OTc3Nzl9.CfLgS5aAjmOyrDhsAPUixebjRUuHS6Oql_4RWOuSyhs',
  },
});

export default myAxios;
