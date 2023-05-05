import { makeAutoObservable } from 'mobx'
import Phone from './Phone'
import Gateway from 'Gateway'

export default class PhoneStore {
	phones: Phone[] = []
	selectedPhone: Phone = new Phone()
	dialogOpen = false

	constructor() {
		makeAutoObservable(this)
	}

	init() {
		const gateway = new Gateway()
		gateway.phone.getAll().then((phones) => {
			const xPhones: Phone[] = []
			phones.forEach((phone) => {
				xPhones.push(Phone.convertFromDto(phone))
			})
			this.setPhones(xPhones)
		})
	}

	private setPhones(phones: Phone[]) {
		this.phones = phones
	}

	setSelectedPhone(phone: Phone) {
		this.selectedPhone = phone
	}

	setDialogOpen(open: boolean) {
		this.dialogOpen = open
		if (!open) {
			this.setSelectedPhone(new Phone())
		}
	}

	create(newPhone: Phone) {
		this.setPhones([...this.phones, newPhone])
	}

	update(updatedPhone: Phone) {
		this.setPhones([
			...this.phones.filter((phone) => phone.id !== updatedPhone.id),
			updatedPhone,
		])
	}

	delete(id: string) {
		this.setPhones(this.phones.filter((phone) => phone.id !== id))
	}
}
