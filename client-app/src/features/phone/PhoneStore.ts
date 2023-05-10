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
			if (!phones.length) return

			phones.forEach((phone) => {
				runInAction(() => {
					this.phoneRegistry.set(phone.id, phone)
					this.phonesAreSet = true
				})
			})
		})
	}

	async getPhone(phoneId?: string): Promise<Phone> {
		if (!phoneId) return new Phone()

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

	async findPhone(phoneId: string): Promise<Phone> {
		const phone = this.phoneRegistry.get(phoneId)
		if (phone) return phone.copy()

		try {
			const phoneDto = await gateway.phone.findPhone(phoneId)
			return Phone.convertFromDto(phoneDto)
		} catch (error) {
			throw new Error()
		}
	}

	async create(newPhone: Phone) {
		newPhone.setId(uuid())
		newPhone.setPublishDate(new Date())

		try {
			await gateway.phone.create(newPhone.convertToDto())
			runInAction(() => {
				this.phoneRegistry.set(newPhone.id, newPhone)
			})
		} catch (error) {
			throw new Error()
		}
	}

	async update(updatedPhone: Phone) {
		updatedPhone.setUpdateDate(new Date())

		try {
			await gateway.phone.update(updatedPhone.convertToDto())
			runInAction(() => {
				this.phoneRegistry.set(updatedPhone.id, updatedPhone)
			})
		} catch (error) {
			throw new Error()
		}
	}

	async delete(phoneId: string) {
		try {
			await gateway.phone.delete(phoneId)
			runInAction(() => {
				this.phoneRegistry.delete(phoneId)
			})
		} catch (error) {
			throw new Error()
		}
	}
}
