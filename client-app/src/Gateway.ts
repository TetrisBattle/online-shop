import axios, { AxiosResponse } from 'axios'
import phoneGateway from './features/phone/PhoneGateway'

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = (response: AxiosResponse) => response.data

export const requests = {
	get: (url: string) => axios.get(url).then(responseBody),
	post: (url: string, body: object) =>
		axios.get(url, body).then(responseBody),
	put: (url: string, body: object) => axios.get(url, body).then(responseBody),
	delete: (url: string) => axios.get(url).then(responseBody),
}

const gateway = {
	phone: phoneGateway,
}

export default gateway
