import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@mui/material'

function Home() {
	return (
		<Box id='Home' sx={{ p: { xs: 2, sm: 3 } }}>
			<Typography variant='h1'>Home</Typography>
		</Box>
	)
}

export default observer(Home)
