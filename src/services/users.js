import http from '../utils/http-common';

const registerUser = (user) => {
  return http.post('/users/register', user)
    .catch((error) => { throw error.response; });
};

const getEmailVerified = (token) => {
  return http.get('/users/email_verification', {
    params: {
      token,
    }
  });
};

const authenticate = async (user) => {
  const { data } = await http.post('/users/login', user);
  return data;
};

const UserService = {
  registerUser,
  getEmailVerified,
  authenticate
};

export default UserService;
