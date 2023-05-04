import { observer } from 'mobx-react-lite'
import { Box, Button } from '@mui/material'
import PhoneList from 'features/phone/PhoneList'
import PhoneDialog from 'features/phone/PhoneDialog'
import { useStoreContext } from 'contexts/StoreContext'

function Home() {
	const { phoneStore } = useStoreContext()
	return (
		<Box id='Home' sx={{ p: { xs: 2, sm: 3 } }}>
			<Button
				onClick={() => phoneStore.setOpenDialog(true)}
				sx={{ ml: 3, mr: 'auto', borderRadius: 10 }}
			>
				Add new Item
			</Button>
			<PhoneList />
			<PhoneDialog />
		</Box>
	)
}

export default observer(Home)
