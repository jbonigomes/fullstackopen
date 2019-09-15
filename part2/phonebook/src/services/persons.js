import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export const get = () => axios.get(baseUrl).then((res) => res.data)
export const create = person => axios.post(baseUrl, person).then((res) => res.data)
