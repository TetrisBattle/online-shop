import { AlertColor } from '@mui/material'
import { enqueueSnackbar } from 'notistack'

export type SnackbarCloseOption = 'auto' | 'manual' | 'never'

function showSnackbar(
	message: string,
	variant: AlertColor = 'info',
	closeOption: SnackbarCloseOption = 'auto'
): void {
	const persist = closeOption !== 'auto'

	enqueueSnackbar?.(message, {
		variant,
		closeOption,
		persist,
		anchorOrigin: { horizontal: 'center', vertical: 'top' },
	})
}

export default showSnackbar
