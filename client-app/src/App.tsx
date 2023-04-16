import { BrowserRouter as Router } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import Header from 'components/header/Header'
import AppRoutes from 'AppRoutes'

export default function App() {
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
