import config from '../config';
import TokenService from './token-service';

const UsersApiService = {
  getUser(id) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json());
  },
  getUsersByBand(band_id) {
    return fetch(`${config.API_ENDPOINT}/users/band/${band_id}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
      .then((res) =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json());
  },
  updateUser(id, updatedFields) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...updatedFields }),
    })
      .then((res) =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json());
  },
};

export default UsersApiService;
