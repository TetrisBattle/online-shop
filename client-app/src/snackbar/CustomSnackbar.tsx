import { forwardRef } from 'react'
import { Alert, AlertColor } from '@mui/material'
import { CustomContentProps, closeSnackbar } from 'notistack'
import { SnackbarCloseOption } from './showSnackbar'

declare module 'notistack' {
	interface VariantOverrides {
		info: {
			closeOption: SnackbarCloseOption
		}
		success: {
			closeOption: SnackbarCloseOption
		}
		warning: {
			closeOption: SnackbarCloseOption
		}
		error: {
			closeOption: SnackbarCloseOption
		}
	}
}

interface SnackbarProps extends CustomContentProps {
	closeOption: SnackbarCloseOption
}

const CustomSnackbar = forwardRef<HTMLDivElement, SnackbarProps>(
	(props, ref) => {
		const { id, message, variant, closeOption } = props

		function handleDismiss() {
			closeSnackbar(id)
		}

		return (
			<Alert
				ref={ref}
				variant='filled'
				severity={variant as AlertColor}
				onClose={closeOption === 'never' ? undefined : handleDismiss}
			>
				{message}
			</Alert>
		)
	}
)

CustomSnackbar.displayName = 'CustomSnackbar'

export default CustomSnackbar
