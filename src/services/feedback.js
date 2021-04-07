import http from '../utils/http-common';

const getAll = () => {
  return http.get('/feedback/all');
};

const FeedbackService = {
  getAll
};

export default FeedbackService;
