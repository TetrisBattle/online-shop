import { makeAutoObservable } from 'mobx'
import { PhoneDto } from './PhoneGateway'

export default class Phone {
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
			new Date(dto.publishDate),
			dto.updateDate ? new Date(dto.updateDate) : null
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

	copy(): Phone {
		return new Phone(
			this.id,
			this.name,
			this.price,
			this.description,
			this.category,
			this.publishDate,
			this.updateDate
		)
	}
}
