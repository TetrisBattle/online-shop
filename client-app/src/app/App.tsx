import { Outlet } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import Header from 'components/header/Header'
import { observer } from 'mobx-react-lite'

function App() {
	const { appStore } = useStoreContext()

	return (
		<>
			<Header />
			<Outlet />
			<Backdrop open={appStore.isLoading}>
				<CircularProgress />
			</Backdrop>
		</>
	)
}

export default observer(App)
