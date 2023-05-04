import { makeAutoObservable } from 'mobx'

export default class AppStore {
	isDarkTheme = false
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	toggleDarkTheme = () => {
		this.isDarkTheme = !this.isDarkTheme
	}

	setIsLoading(value: boolean) {
		this.isLoading = value
	}
}
