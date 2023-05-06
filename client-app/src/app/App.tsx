import { Outlet } from 'react-router-dom'
import Header from 'components/header/Header'
import { observer } from 'mobx-react-lite'

function App() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}

export default observer(App)
