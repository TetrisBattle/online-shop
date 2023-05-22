import axios, { AxiosResponse } from 'axios'
import accountGateway from 'features/users/AccountGateway'
import phoneGateway from './features/phone/PhoneGateway'
import { RouteOption, router } from 'app/Routes'
import toast from 'snackbar/toast'

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(
	async (response) => {
		return response
	},
	async (error) => {
		if (!error.response) {
			toast.error('Network error')
			return
		}

		const { data, status, config } = error.response as AxiosResponse

		switch (status) {
			case 400:
				if (
					config.method === 'get' &&
					Object.prototype.hasOwnProperty.call(data, 'id')
				) {
					router.navigate(RouteOption.NotFound)
				} else if (data.errors) {
					throw error
				} else {
					toast.error(`${status} Bad request`)
				}
				break
			case 401:
				// toast.error(`${status} Unauthorised`)
				break
			case 403:
				toast.error(`${status} Forbidden`)
				break
			case 404:
				router.navigate(RouteOption.NotFound)
				break
			case 500:
				toast.error(`${status} Server error`)
				break
			default:
				toast.error(`${status} Unknown error`)
				break
		}

		return Promise.reject(error)
	}
)

const responseBody = (response: AxiosResponse) => response.data

export const requests = {
	get: (url: string) => axios.get(url).then(responseBody),
	post: (url: string, body: object) =>
		axios.post(url, body).then(responseBody),
	put: (url: string, body: object) => axios.put(url, body).then(responseBody),
	delete: (url: string) => axios.delete(url).then(responseBody),
}

const gateway = {
	phone: phoneGateway,
	account: accountGateway,
}

export default gateway
