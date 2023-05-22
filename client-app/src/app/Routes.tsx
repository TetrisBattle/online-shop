import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'
import App from 'app/App'
import NotFound from 'routes/NotFound'
import Login from 'features/users/components/Login'
import RegisterForm from 'features/users/components/Register'
import Home from 'routes/Home'
import About from 'routes/About'
import PhonesPage from 'features/phone/components/PhonesPage'
import PhoneForm from 'features/phone/components/PhoneForm'

export const enum RouteOption {
	NotFound = '/404',
	Login = '/login',
	Register = '/register',
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
			{ path: RouteOption.NotFound, element: <NotFound /> },
			{
				path: '*',
				element: <Navigate replace to={RouteOption.NotFound} />,
			},
			{ path: RouteOption.Login, element: <Login /> },
			{ path: RouteOption.Register, element: <RegisterForm /> },
			{ path: RouteOption.Home, element: <Home /> },
			{ path: RouteOption.About, element: <About /> },
			{ path: RouteOption.Phones, element: <PhonesPage /> },
			{ path: `${RouteOption.Phones}/new`, element: <PhoneForm /> },
			{ path: `${RouteOption.Phones}/:id`, element: <PhoneForm /> },
		],
	},
]

export const router = createBrowserRouter(routes)
