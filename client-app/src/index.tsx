import React from 'react'
import ReactDOM from 'react-dom/client'
import { StoreContextProvider } from 'contexts/StoreContext'
import MuiThemeProvider from 'material-ui/MuiThemeProvider'
import { router } from 'app/Routes'
import { RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import CustomSnackbar from 'snackbar/CustomSnackbar'

const rootElement = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

rootElement.render(
	<React.StrictMode>
		<StoreContextProvider>
			<MuiThemeProvider>
				<SnackbarProvider
					maxSnack={5}
					Components={{
						info: CustomSnackbar,
						success: CustomSnackbar,
						warning: CustomSnackbar,
						error: CustomSnackbar,
					}}
				/>
				<RouterProvider router={router} />
			</MuiThemeProvider>
		</StoreContextProvider>
	</React.StrictMode>
)
