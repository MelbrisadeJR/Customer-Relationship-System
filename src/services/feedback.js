import http from '../utils/http-common';

const getAll = () => {
  return http.get('/feedback/all');
};

const deleteFeedback = (feedbackSeq) => {
  return http.delete(`/feedback/${feedbackSeq}`);
};

const FeedbackService = {
  getAll,
  deleteFeedback
};

export default FeedbackService;
