import axios from 'axios'

export interface PhoneDto {
	id: string
	name: string
	price: number
	description: string
	category: string
	publishDate: Date
	updateDate: Date | null
}

export default class PhoneGateway {
	constructor(private baseApiUrl: string) {}

	async getPhones(): Promise<PhoneDto[]> {
		const response = await axios.get(`${this.baseApiUrl}/Phones`)
		return response.data
	}
}
