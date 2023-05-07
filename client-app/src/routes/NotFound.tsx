import { Box, Button, Typography } from '@mui/material'
import { RouteOption } from 'app/Routes'
import { Link } from 'react-router-dom'

function NotFound() {
	return (
		<Box
			id='NotFound'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 3,
				mt: 3,
			}}
		>
			<Typography variant='h1'>Not Found!</Typography>
			<Button component={Link} to={RouteOption.Home}>
				Return to home page
			</Button>
		</Box>
	)
}

export default NotFound
