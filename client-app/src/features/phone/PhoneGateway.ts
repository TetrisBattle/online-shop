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
	baseUrl: string
	constructor(baseApiUrl: string) {
		this.baseUrl = `${baseApiUrl}/Phones`
	}

	async getPhone(phoneId: string): Promise<PhoneDto> {
		const response = await axios.get(`${this.baseUrl}?id=${phoneId}`)
		return response.data
	}

	async getPhones(): Promise<PhoneDto[]> {
		const response = await axios.get(this.baseUrl)
		return response.data
	}

	async createPhone(phone: PhoneDto): Promise<PhoneDto[]> {
		const response = await axios.put(this.baseUrl, phone)
		return response.data
	}

	async updatePhone(phone: PhoneDto): Promise<PhoneDto[]> {
		const response = await axios.put(this.baseUrl, phone)
		return response.data
	}

	async deletePhone(phoneId: string): Promise<PhoneDto[]> {
		const response = await axios.delete(`${this.baseUrl}?id=${phoneId}`)
		return response.data
	}
}
