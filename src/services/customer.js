import axios from 'axios';
import http from '../utils/http-common';

const getAll = () => {
  return http.get('/customers');
};

const getOne = (id) => {
  return http.get(`/customers/${id}`);
};

const addCustomer = (customer) => {
  axios.post('http://localhost:8080/api/customers', customer)
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
};

const deleteCustomer = (id) => {
  return http.delete(`/customers/${id}`);
};

const CustomerService = {
  getAll,
  getOne,
  addCustomer,
  deleteCustomer
};

export default CustomerService;
