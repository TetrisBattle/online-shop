import { Box } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import { observer } from 'mobx-react-lite'
import PhoneListItem from './PhoneListItem'

function PhoneList() {
	const { phoneStore } = useStoreContext()

	return (
		<Box
			id='PhoneList'
			sx={{
				m: (theme) => theme.spacing(2, 'auto'),
				maxWidth: '800px',
				display: 'grid',
				gap: 2,
			}}
		>
			{phoneStore.phones.map((phone) => (
				<PhoneListItem key={phone.id} phone={phone} />
			))}
		</Box>
	)
}

export default observer(PhoneList)
