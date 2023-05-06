import { makeAutoObservable, runInAction } from 'mobx'
import Phone from './Phone'
import gateway from 'gateway'
import { v4 as uuid } from 'uuid'

export default class PhoneStore {
	phoneRegistry = new Map<string, Phone>()
	selectedPhone: Phone = new Phone()
	dialogOpen = false

	constructor() {
		makeAutoObservable(this)
	}

	get phones() {
		const phonesArray = Array.from(this.phoneRegistry.values())
		return phonesArray.sort((a, b) =>
			a.publishDate > b.publishDate ? -1 : 1
		)
	}

	async setPhones(): Promise<void> {
		this.getPhones().then((phones) => {
			phones.forEach((phone) => {
				runInAction(() => {
					this.phoneRegistry.set(phone.id, phone)
				})
			})
		})
	}

	async setSelectedPhone(phoneId?: string) {
		if (!phoneId) {
			this.selectedPhone = new Phone()
			return
		}

		const phone = this.phoneRegistry.get(phoneId)
		if (phone) {
			this.selectedPhone = phone.copy()
			return
		}

		this.getPhone(phoneId).then((phone) => {
			runInAction(() => {
				this.selectedPhone = phone
			})
		})
	}

	setDialogOpen(open: boolean) {
		this.dialogOpen = open
		if (!open) {
			this.setSelectedPhone()
		}
	}

	async save() {
		if (!this.selectedPhone.id) this.create(this.selectedPhone)
		else this.update(this.selectedPhone)
	}

	async getPhones(): Promise<Phone[]> {
		try {
			const phonesDto = await gateway.phone.getPhones()
			const phones: Phone[] = []
			phonesDto.forEach((phoneDto) => {
				phones.push(Phone.convertFromDto(phoneDto))
			})
			return phones
		} catch (error) {
			throw new Error()
		}
	}

	async getPhone(phoneId: string): Promise<Phone> {
		const phone = this.phoneRegistry.get(phoneId)
		if (phone) return phone.copy()

		try {
			const phoneDto = await gateway.phone.getPhone(phoneId)
			return Phone.convertFromDto(phoneDto)
		} catch (error) {
			throw new Error()
		}
	}

	async create(newPhone: Phone) {
		this.selectedPhone.setId(uuid())
		this.selectedPhone.setPublishDate(new Date())
		try {
			await gateway.phone.create(newPhone.convertToDto())
		} catch (error) {
			throw new Error()
		} finally {
			runInAction(() => {
				this.phoneRegistry.set(newPhone.id, newPhone)
			})
		}
	}

	async update(updatedPhone: Phone) {
		this.selectedPhone.setUpdateDate(new Date())
		try {
			await gateway.phone.update(updatedPhone.convertToDto())
		} catch (error) {
			throw new Error()
		} finally {
			runInAction(() => {
				this.phoneRegistry.set(updatedPhone.id, updatedPhone)
			})
		}
	}

	async delete(phoneId: string) {
		try {
			await gateway.phone.delete(phoneId)
		} catch (error) {
			throw new Error()
		} finally {
			runInAction(() => {
				this.phoneRegistry.delete(phoneId)
			})
		}
	}
}
