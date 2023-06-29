import axios from "axios";

export const API = axios.create({
    baseURL : "https://hacker-news.firebaseio.com/v0"  
})
