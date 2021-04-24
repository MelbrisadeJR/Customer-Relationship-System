import http from '../utils/http-common';

const getAll = () => {
  return http.get('/feedback/all');
};

const deleteFeedback = (feedbackId) => {
  return http.delete(`/feedback/${feedbackId}`);
};

const createFeedback = () => {
  return http.post('/feedback');
};

const FeedbackService = {
  getAll,
  deleteFeedback,
  createFeedback
};

export default FeedbackService;
