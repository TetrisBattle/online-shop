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

	init() {
		this.getPhones()
	}

	get phones() {
		const phonesArray = Array.from(this.phoneRegistry.values())
		return phonesArray.sort((a, b) =>
			a.publishDate > b.publishDate ? -1 : 1
		)
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

	private async getPhones(): Promise<void> {
		try {
			const phonesDto = await gateway.phone.getPhones()
			phonesDto.forEach((phoneDto) => {
				runInAction(() => {
					this.phoneRegistry.set(
						phoneDto.id,
						Phone.convertFromDto(phoneDto)
					)
				})
			})
		} catch (error) {
			throw new Error()
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
