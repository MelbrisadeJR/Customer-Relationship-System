import http from '../utils/http-common';

const getAll = () => {
  return http.get('/feedback/all');
};

const deleteFeedback = (feedbackId) => {
  return http.delete(`/feedback/${feedbackId}`);
};

const createFeedback = (feedback) => {
  http.post('/feedback', feedback)
    .then((response) => {
      window.location.reload(false);
      console.log(response);
    }, (error) => {
      alert(error);
    });
};

const FeedbackService = {
  getAll,
  deleteFeedback,
  createFeedback
};

export default FeedbackService;
