import http from '../utils/http-common';

const getTotalCustomers = () => {
  return http.get('/customers/totalCustomers');
};

const DashboardService = {
  getTotalCustomers
};
export default DashboardService;
