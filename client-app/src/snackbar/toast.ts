import showSnackbar, { SnackbarCloseOption } from './showSnackbar'

type SnackbarErrorCloseOption = 'manual' | 'never'

function info(message: string, closeOption: SnackbarCloseOption = 'auto') {
	showSnackbar(message, 'info', closeOption)
}

function success(message: string, closeOption: SnackbarCloseOption = 'auto') {
	showSnackbar(message, 'success', closeOption)
}

function warning(message: string, closeOption: SnackbarCloseOption = 'manual') {
	showSnackbar(message, 'warning', closeOption)
}

function error(
	message: string,
	closeOption: SnackbarErrorCloseOption = 'manual'
) {
	showSnackbar(message, 'error', closeOption)
}

const toast = {
	info,
	success,
	warning,
	error,
}

export default toast
