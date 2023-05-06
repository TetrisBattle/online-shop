import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	IconButton,
	Typography,
	DialogProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface CustomDialogProps extends DialogProps {
	onClose: () => void
	title: string
	actions: React.ReactNode
	children: React.ReactNode
}

function CustomDialog({
	open,
	onClose,
	title,
	actions,
	children,
	...props
}: CustomDialogProps) {
	return (
		<Dialog open={open} onClose={onClose} {...props}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					bgcolor: (theme) => theme.palette.primary.main,
					color: (theme) => theme.palette.primary.contrastText,
					p: 1,
					alignItems: 'center',
				}}
			>
				<Typography component='h2' sx={{ fontSize: 20, pl: 2 }}>
					{title}
				</Typography>
				<IconButton color='inherit' onClick={() => onClose()}>
					<CloseIcon fontSize='large' />
				</IconButton>
			</Box>
			<DialogContent>{children}</DialogContent>
			<DialogActions>{actions}</DialogActions>
		</Dialog>
	)
}

export default CustomDialog
