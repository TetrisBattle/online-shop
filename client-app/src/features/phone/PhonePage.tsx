import { observer } from 'mobx-react-lite'
import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RouteOption } from 'app/Routes'

function PhonesPage() {
	const { id: phoneId } = useParams()
	const { phoneStore } = useStoreContext()

	useEffect(() => {
		phoneId === 'new'
			? phoneStore.setSelectedPhone()
			: phoneStore.setSelectedPhone(phoneId)
	}, [phoneStore, phoneId])

	function handleSave() {
		phoneStore.save()
	}

	return (
		<Box id='PhonePage' sx={{ p: { xs: 2, sm: 3 } }}>
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
				<Button component={Link} to={RouteOption.Phones}>
					Cancel
				</Button>
				<Button
					component={Link}
					to={RouteOption.Phones}
					onClick={handleSave}
				>
					Save
				</Button>
			</Box>
		</Box>
	)
}

export default observer(PhonesPage)
