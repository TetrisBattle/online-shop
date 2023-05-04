import axios from 'axios'

export default class PhoneGateway {
	constructor(private baseApiUrl: string) {}

	async getAll() {
		const response = await axios.get(`${this.baseApiUrl}/Phones`)
		return response.data
	}
}
