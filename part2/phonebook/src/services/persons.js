import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export const getPersons = () =>
  axios.get(baseUrl).then((res) => res.data)

export const createPerson = (person) =>
  axios.post(baseUrl, person).then((res) => res.data)

export const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`)
