import axios from 'axios';

// const baseURL = `${process.env.SITE_URL}/api}`;
const baseURL = 'http://localhost:8090/api';

const MelbrisadeServer = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json'
  }
});

export default MelbrisadeServer;
