import React from 'react'
import ReactDOM from 'react-dom/client'
import { StoreContextProvider } from 'contexts/StoreContext'
import MuiThemeProvider from 'material-ui/MuiThemeProvider'
import { router } from 'app/Routes'
import { RouterProvider } from 'react-router-dom'

const rootElement = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

rootElement.render(
	<React.StrictMode>
		<StoreContextProvider>
			<MuiThemeProvider>
				<RouterProvider router={router} />
			</MuiThemeProvider>
		</StoreContextProvider>
	</React.StrictMode>
)
