import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request =  axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`, {response: id })
}

const replace = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, replace }