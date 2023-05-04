import { createTheme } from '@mui/material/styles'
import defaultTheme from './defaultTheme'

export default function muiTheme(isDarkTheme: boolean) {
	const theme = defaultTheme(isDarkTheme)

	return createTheme(theme, {
		components: {
			// MuiButton: {
			// 	defaultProps: {
			// 		variant: 'contained',
			// 	},
			// 	styleOverrides: {
			// 		root: {
			// 			padding: '4px 14px',
			// 		},
			// 	},
			// },
			MuiDialog: {
				styleOverrides: {
					root: {
						'& .MuiDialog-paper': {
							minWidth: theme.breakpoints.values.sm,
						},
					},
				},
			},
		},
	})
}
