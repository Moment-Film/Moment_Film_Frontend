import axios from "axios";

const ourAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default ourAxios;