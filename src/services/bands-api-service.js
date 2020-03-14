import config from '../config';
import TokenService from './token-service';

const BandsApiService = {
  getBands() {
    return fetch(`${config.API_ENDPOINT}/bands`)
      .then((res) =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json());
  },
  getBandById(id) {
    return fetch(`${config.API_ENDPOINT}/bands/${id}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
      .then((res) => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json());
  },
  getBandByUserId(id) {
    return fetch(`${config.API_ENDPOINT}/bands/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
      .then((res) =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json());
  },
  postBand(newBand) {
    return fetch(`${config.API_ENDPOINT}/bands`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(newBand),
    })
      .then((res) =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json());
  },
  updateBand(id, updatedFields) {
    return fetch(`${config.API_ENDPOINT}/bands/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ ...updatedFields }),
    })
      .then((res) =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json());
  },
};

export default BandsApiService;
