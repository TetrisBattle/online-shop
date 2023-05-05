import { makeAutoObservable } from 'mobx'
import Phone from './Phone'
import Gateway from 'Gateway'

export default class PhoneStore {
	phones: Phone[] = []
	selectedPhone: Phone = new Phone()
	dialogOpen = false

	constructor(private gateway: Gateway) {
		makeAutoObservable(this)
	}

	init() {
		this.gateway.phone.getPhones().then((phonesDto) => {
			const phones: Phone[] = []
			phonesDto.forEach((phoneDto) => {
				phones.push(Phone.convertFromDto(phoneDto))
			})
			this.setPhones(phones)
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
