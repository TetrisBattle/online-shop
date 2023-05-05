import { makeAutoObservable } from 'mobx'
import Phone from './Phone'
import gateway from 'gateway'
import { v4 as uuid } from 'uuid'

export default class PhoneStore {
	phones: Phone[] = []
	selectedPhone: Phone = new Phone()
	dialogOpen = false

	constructor() {
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

	private async getPhones(): Promise<Phone[]> {
		try {
			const phonesDto = await gateway.phone.getPhones()
			const phones: Phone[] = []
			phonesDto.forEach((phoneDto) => {
				phones.push(Phone.convertFromDto(phoneDto))
			})
			return phones
		} catch (error) {
			throw new Error('Error getting phones')
		}
	}

	async getPhone(phoneId: string): Promise<Phone> {
		const phoneDto = await gateway.phone.getPhone(phoneId)
		return Phone.convertFromDto(phoneDto)
	}

	async create(newPhone: Phone) {
		this.selectedPhone.setId(uuid())
		this.selectedPhone.setPublishDate(new Date())
		try {
			await gateway.phone.create(newPhone.convertToDto())
		} catch (error) {
			throw new Error('Error creating phone')
		} finally {
			this.setPhones([...this.phones, newPhone])
		}
	}

	async update(updatedPhone: Phone) {
		this.selectedPhone.setUpdateDate(new Date())
		try {
			await gateway.phone.update(updatedPhone.convertToDto())
		} catch (error) {
			throw new Error('Error updating phone')
		} finally {
			this.setPhones([
				...this.phones.filter((phone) => phone.id !== updatedPhone.id),
				updatedPhone,
			])
		}
	}

	async delete(phoneId: string) {
		try {
			await gateway.phone.delete(phoneId)
		} catch (error) {
			throw new Error('Error deleting phone')
		} finally {
			this.setPhones(this.phones.filter((phone) => phone.id !== phoneId))
		}
	}
}
