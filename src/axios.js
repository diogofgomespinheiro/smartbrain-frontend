import axios from 'axios';

const instance = axios.create({
  baseURL: "http://192.168.99.101:5000"
})

export default instance;