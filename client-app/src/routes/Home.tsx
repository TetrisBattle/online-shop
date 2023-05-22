import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@mui/material'

function Home() {
	return (
		<Box id='Home' sx={{ p: 2 }}>
			<Typography variant='h1'>Home</Typography>
		</Box>
	)
}

export default observer(Home)
