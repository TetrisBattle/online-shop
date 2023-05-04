import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import CustomDialog from 'components/CustomDialog'
import { useStoreContext } from 'contexts/StoreContext'
import { observer } from 'mobx-react-lite'

function PhoneDialog() {
	const { phoneStore } = useStoreContext()

	return (
		<CustomDialog
			id='PhoneDialog'
			open={phoneStore.dialogOpen}
			onClose={() => phoneStore.setOpenDialog(false)}
			title='Add new phone'
			actions={
				<>
					<Button onClick={() => phoneStore.setOpenDialog(false)}>
						Cancel
					</Button>
					<Button onClick={() => phoneStore.setOpenDialog(false)}>
						Save
					</Button>
				</>
			}
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
		</CustomDialog>
	)
}

export default observer(PhoneDialog)
