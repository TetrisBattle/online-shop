import { observer } from 'mobx-react-lite'
import { Box, Button, Typography } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import { getActivities } from 'gateway/gateway'

function Home() {
	const { appStore } = useStoreContext()

	return (
		<Box sx={{ p: { xs: 2, sm: 3 } }}>
			<Typography variant='h1'>Home</Typography>
			<Button onClick={() => appStore.setIsLoading(true)}>Button</Button>
			<Button
				onClick={async () => {
					const activities = await getActivities()
					// eslint-disable-next-line no-console
					console.log(activities)
				}}
			>
				Axios
			</Button>
		</Box>
	)
}

export default observer(Home)
