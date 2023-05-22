import { makeAutoObservable, runInAction } from 'mobx'
import { LoginForm, RegisterForm, User } from './User'
import gateway from 'gateway'

export default class UserStore {
	user: User | null = null

	constructor() {
		makeAutoObservable(this)
	}

	get isLoggedIn() {
		return !!this.user
	}

	login = async (creds: LoginForm) => {
		try {
			const user = await gateway.account.login(creds)
			runInAction(() => {
				this.user = user
			})
			localStorage.setItem('jwt', user.token)
		} catch (error) {
			throw new Error()
		}
	}

	logout = () => {
		runInAction(() => {
			this.user = null
		})
		localStorage.removeItem('jwt')
	}

	register = async (newUser: RegisterForm) => {
		const user = await gateway.account.register(newUser)
		runInAction(() => {
			this.user = user
		})
		localStorage.setItem('jwt', user.token)
	}
}
