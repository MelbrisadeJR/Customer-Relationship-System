import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Content-type': 'application/json'
  }
});
