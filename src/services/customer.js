import http from '../utils/http-common';

const getAll = () => {
  return http.get('/customer');
};

const getOne = (id) => {
  return http.get(`/customer/${id}`);
};

const CustomerService = {
  getAll,
  getOne
};

export default CustomerService;
