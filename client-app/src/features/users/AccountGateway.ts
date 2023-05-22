import { requests } from 'gateway'
import { LoginForm, RegisterForm, User } from './User'

const accountApiUrl = '/account'

const accountGateway = {
	current: (): Promise<User> => {
		return requests.get(accountApiUrl)
	},
	login: (creds: LoginForm): Promise<User> => {
		return requests.post(`${accountApiUrl}/login`, creds)
	},
	register: (newUser: RegisterForm): Promise<User> => {
		return requests.post(`${accountApiUrl}/register`, newUser)
	},
}

export default accountGateway
