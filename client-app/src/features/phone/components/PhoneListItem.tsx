import { Box, Button, Typography } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import Phone from '../Phone'
import { observer } from 'mobx-react-lite'
import { formatDate } from 'utility/dateHandler'
import { useNavigate } from 'react-router-dom'
import { RouteOption } from 'app/Routes'
import LoadingButton from 'components/LoadingButton'
import { useState } from 'react'

interface PhoneListItemProps {
	phone: Phone
}

function PhoneListItem({ phone }: PhoneListItemProps) {
	const { phoneStore } = useStoreContext()
	const navigate = useNavigate()
	const [isDeleting, setIsDeleting] = useState(false)

	function handleDelete() {
		setIsDeleting(true)
		phoneStore.delete(phone.id).finally(() => {
			setIsDeleting(false)
		})
	}

	function handleEdit() {
		navigate(`${RouteOption.Phones}/${phone.id}`)
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
			<Typography>{formatDate(phone.publishDate)}</Typography>
			{phone.updateDate && (
				<Typography>{formatDate(phone.updateDate)}</Typography>
			)}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					gap: 1,
				}}
			>
				<LoadingButton
					loading={isDeleting}
					color='error'
					onClick={handleDelete}
				>
					Delete
				</LoadingButton>
				<Button onClick={handleEdit}>Edit</Button>
			</Box>
		</Box>
	)
}

export default observer(PhoneListItem)
