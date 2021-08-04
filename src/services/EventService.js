import axios from 'axios'


const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1/passenger',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(page,perPage) {
    return apiClient.get('?page=' + perPage + '&size=' + page)
  },
  getEvent(id) {
    return apiClient.get('/' + id)
  }
}
