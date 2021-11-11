import axios from "axios";

const TOKEN = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "https://welp-rails-api.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default instance;


// 4850E0