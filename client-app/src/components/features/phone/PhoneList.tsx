import { Box, Button, Typography } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import Gateway from 'Gateway'
import { useEffect } from 'react'
import { Phone } from 'components/features/phone/PhoneStore'
import { observer } from 'mobx-react-lite'

function PhoneList() {
	const { phoneStore } = useStoreContext()

	useEffect(() => {
		const gateway = new Gateway()
		gateway.phone.getAll().then((phones) => {
			phoneStore.setPhones(phones)
		})
	}, [phoneStore])

	interface PhoneListItemProps {
		phone: Phone
	}

	function PhoneListItem({ phone }: PhoneListItemProps) {
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
					<Button
						sx={{ bgcolor: (theme) => theme.palette.error.dark }}
					>
						Delete
					</Button>
					<Button>Edit</Button>
				</Box>
			</Box>
		)
	}

	return (
		<Box
			id='phoneList'
			sx={{
				m: (theme) => theme.spacing(1, 'auto'),
				maxWidth: '800px',
			}}
		>
			{phoneStore.phones.map((phone) => (
				<PhoneListItem key={phone.id} phone={phone} />
			))}
		</Box>
	)
}

export default observer(PhoneList)
