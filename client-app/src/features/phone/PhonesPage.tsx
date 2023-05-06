import { observer } from 'mobx-react-lite'
import { Box, Button, CircularProgress } from '@mui/material'
import PhoneList from 'features/phone/PhoneList'
import { useStoreContext } from 'contexts/StoreContext'
import { useEffect, useState } from 'react'
import { RouteOption } from 'app/Routes'
import { useNavigate } from 'react-router-dom'

function PhonesPage() {
	const { phoneStore } = useStoreContext()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	function handleAddNew() {
		navigate(`${RouteOption.Phones}/new`)
	}

	useEffect(() => {
		if (!phoneStore.phonesAreSet) {
			setIsLoading(true)
			phoneStore.setPhones().finally(() => setIsLoading(false))
		}
	}, [phoneStore])

	if (isLoading) {
		return (
			<CircularProgress
				size={96}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					translate: '-50% -50%',
				}}
			/>
		)
	}

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
