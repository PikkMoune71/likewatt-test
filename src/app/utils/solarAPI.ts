import axios from "axios";

const solarAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LIKEWATT_API_URL,
});

export default solarAPI;
