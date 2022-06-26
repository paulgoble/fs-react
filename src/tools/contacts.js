import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createContact = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deleteContact = personId => {
  const request = axios.delete(baseUrl.concat('/', personId))
  return request.then(response => response)
}

const updateContact = person => {
  const request = axios.put(baseUrl.concat('/', person.id), person)
  return request.then(response => response.data)
}

const contacts = { 
  getContacts, 
  createContact, 
  deleteContact, 
  updateContact 
}

export default contacts;