import http from '../utils/http-common';

const getEmailVerified = (token) => {
  return http.get('/users/email_verification', {
    params: {
      token,
    }
  });
};

const UserService = {
  getEmailVerified
};

export default UserService;
