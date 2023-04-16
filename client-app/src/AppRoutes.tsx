import { Routes, Route, Navigate } from 'react-router-dom'
import About from 'routes/About'
import Home from 'routes/Home'

export enum RouteOption {
	Home = '/home',
	About = '/about',
}

export function routeToTitle(route: RouteOption): string {
	return route[1].toUpperCase() + route.slice(2)
}

export default function AppRoutes() {
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
