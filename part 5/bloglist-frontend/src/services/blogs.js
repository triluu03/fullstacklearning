import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


// Getting all the blogs
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


// Create new blogs
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


// Updating blogs
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update }