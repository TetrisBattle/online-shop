import { observer } from 'mobx-react-lite'
import { Box, Button, CircularProgress, InputAdornment } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteOption, router } from 'app/Routes'
import LoadingButton from 'components/LoadingButton'
import { Formik } from 'formik'
import Phone from '../Phone'
import * as Yup from 'yup'
import FormTextField from 'components/form/FormTextField'
import { categoryOptions } from '../options'

function PhoneForm() {
	const { phoneStore } = useStoreContext()
	const { id: phoneId } = useParams()
	const [phone, setPhone] = useState(new Phone())
	const [isLoading, setIsLoading] = useState(false)

	const phoneSchema = Yup.object({
		name: Yup.string().required(),
		price: Yup.number().required(),
		category: Yup.string().required(),
	})

	useEffect(() => {
		if (phoneId) {
			setIsLoading(true)
			phoneStore
				.getPhone(phoneId)
				.then((phone) => setPhone(phone))
				.finally(() => setIsLoading(false))
		}
	}, [phoneStore, phoneId])

	function handleCancel() {
		router.navigate(RouteOption.Phones)
	}

	async function handleFormSubmit(phone: Phone) {
		await phoneStore.save(phone).then(() => {
			router.navigate(RouteOption.Phones)
		})
	}

	if (isLoading) {
		return (
			<CircularProgress
				size={96}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					translate: '-50% -50%',
				}}
			/>
		)
	}

	return (
		<Box
			id={phoneId ? 'EditPhone' : 'NewPhone'}
			sx={{ p: { xs: 2, sm: 3 } }}
		>
			<Formik
				validationSchema={phoneSchema}
				enableReinitialize
				initialValues={phone}
				onSubmit={handleFormSubmit}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Box
						component='form'
						onSubmit={handleSubmit}
						sx={{
							maxWidth: (theme) => theme.breakpoints.values.sm,
							mx: 'auto',
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						<FormTextField
							name='name'
							label='Name'
							required
							fullWidth
						/>
						<FormTextField
							name='price'
							label='Price'
							isNumberInput
							required
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										EUR
									</InputAdornment>
								),
							}}
						/>
						<FormTextField
							name='description'
							label='Description'
							fullWidth
						/>
						<FormTextField
							name='category'
							label='Category'
							options={categoryOptions}
							required
							fullWidth
						/>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								gap: 1,
							}}
						>
							<Button variant='outlined' onClick={handleCancel}>
								Cancel
							</Button>
							<LoadingButton
								loading={isSubmitting}
								type='submit'
								disabled={!isValid || isSubmitting || !dirty}
							>
								Save
							</LoadingButton>
						</Box>
					</Box>
				)}
			</Formik>
		</Box>
	)
}

export default observer(PhoneForm)
