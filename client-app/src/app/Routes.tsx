import App from 'app/App'
import PhonePage from 'features/phone/PhonePage'
import PhonesPage from 'features/phone/PhonesPage'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import About from 'routes/About'
import Home from 'routes/Home'

export enum RouteOption {
	Home = '/home',
	About = '/about',
	Phones = '/phones',
}

export function routeToTitle(route: RouteOption): string {
	return route[1].toUpperCase() + route.slice(2)
}

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		children: [
			{ path: RouteOption.Home, element: <Home /> },
			{ path: RouteOption.About, element: <About /> },
			{ path: RouteOption.Phones, element: <PhonesPage /> },
			{ path: `${RouteOption.Phones}/new`, element: <PhonePage /> },
			{ path: `${RouteOption.Phones}/:id`, element: <PhonePage /> },
		],
	},
]

export const router = createBrowserRouter(routes)
