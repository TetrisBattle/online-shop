import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import { useStoreContext } from 'contexts/StoreContext'
import Header from 'components/header/Header'
import { observer } from 'mobx-react-lite'
import About from 'routes/About'
import Home from 'routes/Home'

export enum RouteOption {
	Home = '/home',
	About = '/about',
}

export function routeToTitle(route: RouteOption): string {
	return route[1].toUpperCase() + route.slice(2)
}

function AppRoutes() {
	return (
		<Routes>
			<Route path='*' element={<Navigate replace to='/' />} />
			<Route
				path='/'
				element={<Navigate replace to={RouteOption.Home} />}
			/>
			<Route path={RouteOption.Home} element={<Home />} />
			<Route path={RouteOption.About} element={<About />} />
		</Routes>
	)
}

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
