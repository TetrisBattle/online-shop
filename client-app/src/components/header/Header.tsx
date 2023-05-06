import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import HeaderMenu from './HeaderMenu'
import DarkThemeIconButton from '../DarkThemeIconButton'
import HeaderButton from './HeaderButton'
import { ReactComponent as Logo } from 'assets/Logo.svg'
import { RouteOption } from 'app/Routes'

export default function Header() {
	return (
		<AppBar>
			<Toolbar sx={{ p: 1 }}>
				<Logo width={48} height={48} />
				<Typography
					variant='h1'
					sx={{ pl: 1, mr: 'auto', fontSize: 32 }}
				>
					OnlineShop
				</Typography>
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
					<HeaderButton route={RouteOption.Phones} />
				</Box>
				<HeaderMenu
					routes={[
						RouteOption.Home,
						RouteOption.About,
						RouteOption.Phones,
					]}
				/>
				<DarkThemeIconButton sx={{ color: 'inherit' }} />
			</Toolbar>
		</AppBar>
	)
}
