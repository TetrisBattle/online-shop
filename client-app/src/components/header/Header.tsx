import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import HeaderMenu from './HeaderMenu'
import DarkThemeIconButton from '../DarkThemeIconButton'
import HeaderButton from './HeaderButton'
import { ReactComponent as Logo } from 'assets/Logo.svg'
import { RouteOption } from 'App'

export default function Header() {
	return (
		<AppBar>
			<Toolbar sx={{ p: 1 }}>
				<Logo width={48} height={48} />
				<Typography variant='h1' sx={{ pl: 1, fontSize: 32 }}>
					OnlineShop
				</Typography>
				<Button sx={{ ml: 3, mr: 'auto', borderRadius: 10 }}>
					Add new Item
				</Button>
				<Box
					sx={{
						pr: 1,
						display: {
							xs: 'none',
							sm: 'block',
						},
					}}
				>
					<HeaderButton route={RouteOption.Home} />
					<HeaderButton route={RouteOption.About} />
				</Box>
				<HeaderMenu routes={[RouteOption.Home, RouteOption.About]} />
				<DarkThemeIconButton sx={{ color: 'inherit' }} />
			</Toolbar>
		</AppBar>
	)
}
