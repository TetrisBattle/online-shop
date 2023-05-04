import { makeAutoObservable } from 'mobx'

interface PhoneDto {
	id: string
	name: string
	price: number
	description: string
	category: string
	publishDate: Date
	updateDate: Date | null
}

export class Phone {
	constructor(
		public id: string = '',
		public name: string = '',
		public price: string = '',
		public description: string = '',
		public category: string = '',
		public publishDate: Date = new Date(),
		public updateDate: Date | null = null
	) {
		makeAutoObservable(this)
	}

	setId(id: string) {
		this.id = id
	}

	setName(name: string) {
		this.name = name
	}

	setPrice(price: string) {
		if (price === '') this.price = ''
		if (!Number(price) || /\s/.test(price)) return
		this.price = price
	}

	setDescription(description: string) {
		this.description = description
	}

	setCategory(category: string) {
		this.category = category
	}

	setPublishDate(publishDate: Date) {
		this.publishDate = publishDate
	}

	setUpdateDate(updateDate: Date | null) {
		this.updateDate = updateDate
	}

	static convertFromDto(dto: PhoneDto): Phone {
		return new Phone(
			dto.id,
			dto.name,
			dto.price.toString(),
			dto.description,
			dto.category,
			dto.publishDate,
			dto.updateDate
		)
	}

	convertToDto(): PhoneDto {
		return {
			id: this.id,
			name: this.name,
			price: Number(this.price),
			description: this.description,
			category: this.category,
			publishDate: this.publishDate,
			updateDate: this.updateDate,
		}
	}
}

export default class PhoneStore {
	phones: Phone[] = []
	selectedPhone: Phone = new Phone()
	dialogOpen = false

	constructor() {
		makeAutoObservable(this)
	}

	setPhones(phones: Phone[]) {
		this.phones = phones
	}

	setSelectedPhone(phone: Phone) {
		this.selectedPhone = phone
	}

	setOpenDialog(value: boolean) {
		this.dialogOpen = value
	}
}
