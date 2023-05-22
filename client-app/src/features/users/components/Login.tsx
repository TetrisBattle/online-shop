import { observer } from 'mobx-react-lite'
import { Formik, FormikHelpers } from 'formik'
import { Box, FormHelperText, Link as MuiLink } from '@mui/material'
import { useStore } from 'contexts/StoreContext'
import FormTextField from 'components/form/FormTextField'
import LoadingButton from 'components/LoadingButton'
import { RouteOption, router } from 'app/Routes'
import { Link } from 'react-router-dom'
import { LoginForm } from '../User'
import FormTitle from 'components/form/FormTitle'

function Login() {
	const { userStore } = useStore()

	const loginValues: LoginForm = {
		email: '',
		password: '',
		error: null,
	}

	async function handleFormSubmit(
		values: LoginForm,
		{ setErrors }: FormikHelpers<LoginForm>
	) {
		await userStore
			.login(values)
			.then(() => router.navigate(RouteOption.Home))
			.catch((error) => setErrors({ error: 'Invalid email or password' }))
	}

	return (
		<Box
			id='Login'
			sx={{
				p: 2,
				maxWidth: 400,
				mx: 'auto',
			}}
		>
			<FormTitle>Login</FormTitle>
			<Formik
				initialValues={{ ...loginValues, error: null }}
				onSubmit={handleFormSubmit}
				validateOnBlur={false}
			>
				{({ handleSubmit, isSubmitting, errors }) => (
					<Box
						component='form'
						onSubmit={handleSubmit}
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<FormTextField
							name='email'
							label='Email'
							required
							fullWidth
							sx={{ mt: 2 }}
						/>

						<FormTextField
							name='password'
							label='Password'
							type='password'
							required
							fullWidth
							sx={{ mt: 2 }}
						/>

						<FormHelperText
							error={true}
							sx={{ my: 1, alignSelf: 'center' }}
						>
							{errors.error}
						</FormHelperText>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<MuiLink component={Link} to={RouteOption.Register}>
								Create account
							</MuiLink>
							<LoadingButton
								loading={isSubmitting}
								type='submit'
								disabled={isSubmitting}
							>
								Login
							</LoadingButton>
						</Box>
					</Box>
				)}
			</Formik>
		</Box>
	)
}

export default observer(Login)
