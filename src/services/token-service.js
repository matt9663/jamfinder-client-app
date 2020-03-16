const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem('token', token);
  },
  getAuthToken() {
    return window.localStorage.getItem('token');
  },
  clearAuthToken() {
    window.localStorage.removeItem('token');
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(user_name, password) {
    return window.btoa(`${user_name}:${password}`);
  },
};

export default TokenService;
