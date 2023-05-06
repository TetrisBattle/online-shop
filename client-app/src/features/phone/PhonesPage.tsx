import { observer } from 'mobx-react-lite'
import { Box, Button } from '@mui/material'
import PhoneList from 'features/phone/PhoneList'
import { useStoreContext } from 'contexts/StoreContext'
import { useEffect } from 'react'
import { RouteOption } from 'app/Routes'
import { Link } from 'react-router-dom'

function PhonesPage() {
	const { phoneStore } = useStoreContext()

	useEffect(() => {
		phoneStore.setPhones()
	}, [phoneStore])

	return (
		<Box id='PhonesPage' sx={{ p: { xs: 2, sm: 3 } }}>
			<Button
				component={Link}
				to={`${RouteOption.Phones}/new`}
				sx={{ ml: 3, mr: 'auto', borderRadius: 10 }}
			>
				Add new Item
			</Button>
			<PhoneList />
		</Box>
	)
}

export default observer(PhonesPage)
