import { observer } from 'mobx-react-lite'
import { Box, Button, CircularProgress } from '@mui/material'
import PhoneList from 'features/phone/components/PhoneList'
import { useStore } from 'contexts/StoreContext'
import { useEffect, useState } from 'react'
import { RouteOption, router } from 'app/Routes'

function PhonesPage() {
	const { phoneStore } = useStore()
	const [isLoading, setIsLoading] = useState(false)

	function handleAddNew() {
		router.navigate(`${RouteOption.Phones}/new`)
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
		<Box id='PhonesPage' sx={{ p: 2 }}>
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
