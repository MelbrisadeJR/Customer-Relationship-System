import http from '../utils/http-common';

const getAll = () => {
  return http.get('/feedback/all');
};

const CustomerService = {
  getAll
};

export default FeedbackService;