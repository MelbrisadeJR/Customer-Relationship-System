import http from '../utils/http-common';

const getAll = () => {
  return http.get('/customers');
};

const getOne = (id) => {
  return http.get(`/customer/${id}`);
};

const addCustomer = (customer) => {
  http
    .post('/customers', customer)
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
};

const deleteCustomer = (id) => {
  return http.delete(`/customers/${id}`);
};

const deleteMultipleCustomersByIds = (customerIds) => {
  console.log(customerIds);
  http
    .put('/customers', customerIds)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
};

const CustomerService = {
  getAll,
  getOne,
  addCustomer,
  deleteCustomer,
  deleteMultipleCustomersByIds
};

export default CustomerService;
