import { makeAutoObservable } from 'mobx'

export default class AppStore {
	isDarkTheme = false

	constructor() {
		makeAutoObservable(this)
	}

	toggleDarkTheme = () => {
		this.isDarkTheme = !this.isDarkTheme
	}
}
