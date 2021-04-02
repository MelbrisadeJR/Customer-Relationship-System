import http from '../utils/http-common';

const getAll = () => {
  return http.get('/customers');
};

const getOne = (id) => {
  return http.get(`/customers/${id}`);
};

const CustomerService = {
  getAll,
  getOne
};

export default CustomerService;
