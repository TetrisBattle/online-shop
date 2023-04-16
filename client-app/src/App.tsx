import { BrowserRouter as Router } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import Header from 'components/header/Header'
import AppRoutes from 'AppRoutes'
import { observer } from 'mobx-react-lite'

function App() {
	const { appStore } = useStoreContext()

	return (
		<Router>
			<Header />
			<AppRoutes />

			<Backdrop open={appStore.isLoading}>
				<CircularProgress />
			</Backdrop>
		</Router>
	)
}

export default observer(App)
