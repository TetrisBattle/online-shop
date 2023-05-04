import { observer } from 'mobx-react-lite'
import { Box } from '@mui/material'
import PhoneList from 'features/phone/PhoneList'

function Home() {
	return (
		<Box sx={{ p: { xs: 2, sm: 3 } }}>
			<PhoneList />
		</Box>
	)
}

export default observer(Home)
