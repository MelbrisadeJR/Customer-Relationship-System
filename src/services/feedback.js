import http from '../utils/http-common';

const getAll = () => {
  return http.get('/feedback/all');
};

const FeedbackService = {
  getAll
};

// const deleteFeedback = (feedbackSeq) => {
//   return http.delete(`/feedback/${feedbackSeq}`);
// };

export default FeedbackService;
