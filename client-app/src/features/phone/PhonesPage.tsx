import { observer } from 'mobx-react-lite'
import { Box, Button } from '@mui/material'
import PhoneList from 'features/phone/PhoneList'
import { useStoreContext } from 'contexts/StoreContext'
import { useEffect } from 'react'
import { RouteOption } from 'app/Routes'
import { useNavigate } from 'react-router-dom'

function PhonesPage() {
	const { phoneStore } = useStoreContext()
	const navigate = useNavigate()

	function handleAddNew() {
		navigate(`${RouteOption.Phones}/new`)
	}

	useEffect(() => {
		if (!phoneStore.phonesAreSet) {
			phoneStore.setPhones()
		}
	}, [phoneStore])

	return (
		<Box id='PhonesPage' sx={{ p: { xs: 2, sm: 3 } }}>
			<Button
				onClick={handleAddNew}
				sx={{ ml: 3, mr: 'auto', borderRadius: 10 }}
			>
				Add new phone
			</Button>
			<PhoneList />
		</Box>
	)
}

export default observer(PhonesPage)
