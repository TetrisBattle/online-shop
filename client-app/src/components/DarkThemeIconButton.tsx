import { Brightness4Outlined as Brightness4OutlinedIcon } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'
import { useStore } from 'contexts/StoreContext'

export default function DarkThemeIconButton(iconButtonProps: IconButtonProps) {
	const { appStore } = useStore()

	return (
		<IconButton onClick={appStore.toggleDarkTheme} {...iconButtonProps}>
			<Brightness4OutlinedIcon />
		</IconButton>
	)
}
