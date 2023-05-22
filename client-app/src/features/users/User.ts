export interface User {
	token: string
	email: string
	username: string
	firstName: string
	lastName: string
	image: string | null
}

export interface LoginForm {
	email: string
	password: string
	error: null
}

export type RegisterForm = Omit<User, 'token'> & Omit<LoginForm, 'error'>
