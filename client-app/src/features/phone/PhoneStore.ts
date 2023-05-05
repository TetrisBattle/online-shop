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

	async init() {
		const phones = await this.getPhones()
		this.setPhones(phones)
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

	async getPhone(phoneId: string): Promise<Phone> {
		const phoneDto = await this.gateway.phone.getPhone(phoneId)
		return Phone.convertFromDto(phoneDto)
	}

	private async getPhones(): Promise<Phone[]> {
		const phonesDto = await this.gateway.phone.getPhones()
		const phones: Phone[] = []
		phonesDto.forEach((phoneDto) => {
			phones.push(Phone.convertFromDto(phoneDto))
		})
		return phones
	}

	create(newPhone: Phone) {
		this.gateway.phone.createPhone(newPhone.convertToDto())
		this.setPhones([...this.phones, newPhone])
	}

	update(updatedPhone: Phone) {
		this.gateway.phone.updatePhone(updatedPhone.convertToDto())
		this.setPhones([
			...this.phones.filter((phone) => phone.id !== updatedPhone.id),
			updatedPhone,
		])
	}

	delete(phoneId: string) {
		this.gateway.phone.deletePhone(phoneId)
		this.setPhones(this.phones.filter((phone) => phone.id !== phoneId))
	}
}
