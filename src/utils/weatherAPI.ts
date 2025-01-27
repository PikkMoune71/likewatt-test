import axios from "axios";

const weatherAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OPENWEATHER_API_URL,
});

export default weatherAPI;
