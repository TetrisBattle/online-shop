import { Box, Button, Typography } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import Phone from './Phone'
import { observer } from 'mobx-react-lite'

interface PhoneListItemProps {
	phone: Phone
}

function PhoneListItem({ phone }: PhoneListItemProps) {
	const { phoneStore } = useStoreContext()

	function handleOnEditClick() {
		phoneStore.setSelectedPhone(phone.copy())
		phoneStore.setDialogOpen(true)
	}

	function handleOnDeleteClick() {
		phoneStore.delete(phone.id)
	}

	return (
		<Box
			sx={{
				bgcolor: (theme) => theme.palette.grey[200],
				p: 2,
				borderRadius: 1,
			}}
		>
			<Typography
				sx={{
					fontWeight: (theme) => theme.typography.fontWeightBold,
					fontSize: 20,
				}}
			>
				{phone.name}
			</Typography>
			<Typography>Price: {phone.price}e</Typography>
			<Typography>{phone.description}</Typography>
			<br />
			<Typography>{phone.category}</Typography>
			<Typography>{phone.publishDate.toString()}</Typography>
			<Typography>{phone.updateDate?.toString()}</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					gap: 1,
				}}
			>
				<Button onClick={handleOnDeleteClick} color='error'>
					Delete
				</Button>
				<Button onClick={handleOnEditClick}>Edit</Button>
			</Box>
		</Box>
	)
}

export default observer(PhoneListItem)
