import axios from 'axios';
import http from '../utils/http-common';

const getAll = () => {
  return http.get('/feedback/all');
};

const deleteFeedback = (feedbackId) => {
  return http.delete(`/feedback/${feedbackId}`);
};

const createFeedback = (feedback) => {
  axios.post('http://localhost:8080/api/feedback', feedback)
    .then((response) => {
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
