import axios from "axios";

const instance = axios.create({
  baseURL: "https://all-remote-backend.herokuapp.com/",
});

export default instance;
