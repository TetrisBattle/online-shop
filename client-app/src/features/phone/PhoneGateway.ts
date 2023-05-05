import { requests } from 'gateway2'

export interface PhoneDto {
	id: string
	name: string
	price: number
	description: string
	category: string
	publishDate: Date
	updateDate: Date | null
}

const phoneApiUrl = '/phones'

const phoneGateway = {
	getPhones: (): Promise<PhoneDto[]> => {
		return requests.get(phoneApiUrl)
	},
	getPhone: (id: string): Promise<PhoneDto> => {
		return requests.get(`${phoneApiUrl}${id}`)
	},
	create: (phone: PhoneDto): Promise<void> => {
		return requests.post(phoneApiUrl, phone)
	},
	update: (phone: PhoneDto): Promise<void> => {
		return requests.put(`${phoneApiUrl}/${phone.id}`, phone)
	},
	delete: (id: string): Promise<void> => {
		return requests.delete(`${phoneApiUrl}/${id}`)
	},
}

export default phoneGateway
