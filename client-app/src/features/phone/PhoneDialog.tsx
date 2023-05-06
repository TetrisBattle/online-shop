import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import CustomDialog from 'components/CustomDialog'
import { useStoreContext } from 'contexts/StoreContext'
import { observer } from 'mobx-react-lite'

function PhoneDialog() {
	const { phoneStore } = useStoreContext()

	function handleCancel() {
		phoneStore.setDialogOpen(false)
	}

	function handleSave() {
		phoneStore.save()
		phoneStore.setDialogOpen(false)
	}

	return (
		<CustomDialog
			id='PhoneDialog'
			open={phoneStore.dialogOpen}
			onClose={handleCancel}
			title={
				!phoneStore.selectedPhone.id ? 'Add new phone' : 'Edit phone'
			}
			actions={
				<>
					<Button onClick={handleCancel}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
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
