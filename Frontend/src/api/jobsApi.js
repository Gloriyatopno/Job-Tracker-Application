import axios from "axios";

const jobsApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default jobsApi;