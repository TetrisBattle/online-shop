import { observer } from 'mobx-react-lite'
import { Box, Button, CircularProgress, InputAdornment } from '@mui/material'
import { useStore } from 'contexts/StoreContext'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RouteOption, router } from 'app/Routes'
import LoadingButton from 'components/LoadingButton'
import { Formik } from 'formik'
import Phone from '../Phone'
import * as Yup from 'yup'
import FormTextField from 'components/form/FormTextField'
import { categoryOptions } from '../options'
import FormTitle from 'components/form/FormTitle'

function PhoneForm() {
	const { phoneStore } = useStore()
	const { id: phoneId } = useParams()
	const [phone, setPhone] = useState(new Phone())
	const [isLoading, setIsLoading] = useState(false)

	const phoneSchema = Yup.object({
		name: Yup.string().required('Name is required'),
		price: Yup.number().required('Price is required'),
		category: Yup.string().required('Category is required'),
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
		<Box id={phoneId ? 'EditPhone' : 'NewPhone'} sx={{ p: 2 }}>
			<FormTitle>{phoneId ? 'Edit Phone' : 'New Phone'}</FormTitle>
			<Formik
				validationSchema={phoneSchema}
				enableReinitialize
				initialValues={phone}
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
							multiline
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
