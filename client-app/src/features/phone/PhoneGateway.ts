import { requests } from 'gateway'

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
		return requests.get(`${phoneApiUrl}/${id}`)
	},
	create: (phoneDto: PhoneDto): Promise<void> => {
		return requests.post(phoneApiUrl, phoneDto)
	},
	update: (phoneDto: PhoneDto): Promise<void> => {
		return requests.put(`${phoneApiUrl}/${phoneDto.id}`, phoneDto)
	},
	delete: (id: string): Promise<void> => {
		return requests.delete(`${phoneApiUrl}/${id}`)
	},
}

export default phoneGateway
