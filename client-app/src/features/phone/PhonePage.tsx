import { observer } from 'mobx-react-lite'
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	InputAdornment,
	TextField,
} from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RouteOption } from 'app/Routes'
import LoadingButton from 'components/LoadingButton'

function PhonesPage() {
	const { phoneStore } = useStoreContext()
	const { id: phoneId } = useParams()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (phoneId) {
			setIsLoading(true)
			phoneStore
				.setSelectedPhone(phoneId)
				.finally(() => setIsLoading(false))
		}
	}, [phoneStore, phoneId])

	function handleCancel() {
		phoneStore.setSelectedPhone()
		navigate(RouteOption.Phones)
	}

	async function handleSubmit() {
		await phoneStore.save().then(() => {
			phoneStore.setSelectedPhone()
			navigate(RouteOption.Phones)
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
			id='PhonePage'
			component='form'
			onSubmit={handleSubmit}
			sx={{ p: { xs: 2, sm: 3 } }}
		>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						label='Name'
						value={phoneStore.selectedPhone.name}
						fullWidth
						onChange={(e) => {
							phoneStore.selectedPhone.setName(e.target.value)
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label='Price'
						value={phoneStore.selectedPhone.price}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									EUR
								</InputAdornment>
							),
						}}
						onChange={(e) => {
							phoneStore.selectedPhone.setPrice(e.target.value)
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label='Description'
						value={phoneStore.selectedPhone.description}
						fullWidth
						onChange={(e) => {
							phoneStore.selectedPhone.setDescription(
								e.target.value
							)
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label='Category'
						value={phoneStore.selectedPhone.category}
						fullWidth
						onChange={(e) => {
							phoneStore.selectedPhone.setCategory(e.target.value)
						}}
					/>
				</Grid>
			</Grid>
			<Box>
				<Button onClick={handleCancel}>Cancel</Button>
				<LoadingButton type='submit' onClick={handleSubmit}>
					Save
				</LoadingButton>
			</Box>
		</Box>
	)
}

export default observer(PhonesPage)
