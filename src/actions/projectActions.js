import axios from 'axios';
import { GET_FEEDBACKS } from './types';

const getFeedbacks = () => async (dispatch) => {
  const res = await axios.get('http://localhost:8080//api/feedback/all');
  dispatch({
    type: GET_FEEDBACKS,
    payload: res.data
  });
};

export default getFeedbacks;
