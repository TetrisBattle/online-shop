import { makeAutoObservable } from 'mobx'

export interface Phone {
	id: number
	name: string
	price: number
	description: string
	category: string
	publishDate: Date
	updateDate: Date | null
}

export default class PhoneStore {
	phones: Phone[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setPhones(phones: Phone[]) {
		this.phones = phones
	}
}
