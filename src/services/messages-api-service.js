import config from '../config'
import TokenService from './token-service'

const MessagesService = {
  getBandMessages(id) {
    return fetch(`${config.API_ENDPOINT}/messages/${id}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()  
    )
  },
  postBandMessage(id, message) {
    return fetch(`${config.API_ENDPOINT}/messages/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'

      },
      body: JSON.stringify({ message })
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()  
    )
  }
}

export default MessagesService