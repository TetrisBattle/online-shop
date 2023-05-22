import * as Yup from 'yup'
import { RegisterForm } from '../User'
import LoadingButton from 'components/LoadingButton'
import { Box } from '@mui/material'
import FormTextField from 'components/form/FormTextField'
import { Formik, FormikHelpers } from 'formik'
import { RouteOption, router } from 'app/Routes'
import { useStore } from 'contexts/StoreContext'
import FormTitle from 'components/form/FormTitle'

function Register() {
	const { userStore } = useStore()

	const newUser: RegisterForm = {
		email: '',
		password: '',
		username: '',
		firstName: '',
		lastName: '',
		image: null,
	}

	const registerSchema = Yup.object({
		email: Yup.string().required('Email is required').email(),
		password: Yup.string()
			.required('Password is required')
			.matches(
				/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
				'Password must have 1 Uppercase, 1 Lowercase, 1 number and at least 8 characters'
			),
		username: Yup.string().required('Username is required'),
		firstName: Yup.string().required('First name is required'),
		lastName: Yup.string().required('Last name is required'),
	})

	async function handleFormSubmit(
		newUser: RegisterForm,
		{ setErrors }: FormikHelpers<RegisterForm>
	) {
		await userStore
			.register(newUser)
			.then(() => {
				router.navigate(RouteOption.Home)
			})
			.catch((error) => {
				const errors = error.response.data.errors
				setErrors({
					email: errors.email?.[0],
					username: errors.username?.[0],
				})
			})
	}

	return (
		<Box id='Register' sx={{ p: 2 }}>
			<FormTitle>Sign up</FormTitle>
			<Formik
				validationSchema={registerSchema}
				initialValues={newUser}
				onSubmit={handleFormSubmit}
				validateOnBlur={false}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Box
						component='form'
						onSubmit={handleSubmit}
						sx={{
							maxWidth: 400,
							mx: 'auto',
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						<FormTextField
							name='email'
							label='Email'
							required
							fullWidth
						/>

						<FormTextField
							name='password'
							label='Password'
							required
							fullWidth
						/>

						<FormTextField
							name='username'
							label='Username'
							required
							fullWidth
						/>

						<FormTextField
							name='firstName'
							label='First name'
							required
							fullWidth
						/>

						<FormTextField
							name='lastName'
							label='Last name'
							required
							fullWidth
						/>

						<LoadingButton
							loading={isSubmitting}
							type='submit'
							disabled={!isValid || isSubmitting || !dirty}
						>
							Create account
						</LoadingButton>
					</Box>
				)}
			</Formik>
		</Box>
	)
}

export default Register
