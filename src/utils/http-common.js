import axios from 'axios';

const baseURL = 'http://localhost:8090/api';

const MelbrisadeServer = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json'
  }
});

export default MelbrisadeServer;
