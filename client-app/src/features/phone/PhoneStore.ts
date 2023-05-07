import { makeAutoObservable, runInAction } from 'mobx'
import Phone from './Phone'
import gateway from 'gateway'
import { v4 as uuid } from 'uuid'

export default class PhoneStore {
	phoneRegistry = new Map<string, Phone>()
	phonesAreSet = false

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
					this.phonesAreSet = true
				})
			})
		})
	}

	async getPhone(phoneId?: string): Promise<Phone> {
		if (!phoneId) {
			return new Phone()
		}

		let phone = this.phoneRegistry.get(phoneId)
		if (phone) return phone.copy()

		phone = await this.findPhone(phoneId).then((phone) => phone)
		if (!phone) throw new Error('Phone not found')
		else return phone
	}

	async save(phone: Phone) {
		if (!phone.id) await this.create(phone)
		else await this.update(phone)
	}

	async getPhones(): Promise<Phone[]> {
		const phonesDto = await gateway.phone.getPhones()
		const phones: Phone[] = []
		phonesDto.forEach((phoneDto) => {
			phones.push(Phone.convertFromDto(phoneDto))
		})
		return phones
	}

	async findPhone(phoneId: string): Promise<Phone> {
		const phone = this.phoneRegistry.get(phoneId)
		if (phone) return phone.copy()

		const phoneDto = await gateway.phone.findPhone(phoneId)
		return Phone.convertFromDto(phoneDto)
	}

	async create(newPhone: Phone) {
		newPhone.setId(uuid())
		newPhone.setPublishDate(new Date())

		await gateway.phone.create(newPhone.convertToDto())
		runInAction(() => {
			this.phoneRegistry.set(newPhone.id, newPhone)
		})
	}

	async update(updatedPhone: Phone) {
		updatedPhone.setUpdateDate(new Date())

		await gateway.phone.update(updatedPhone.convertToDto())
		runInAction(() => {
			this.phoneRegistry.set(updatedPhone.id, updatedPhone)
		})
	}

	async delete(phoneId: string) {
		await gateway.phone.delete(phoneId)
		runInAction(() => {
			this.phoneRegistry.delete(phoneId)
		})
	}
}
