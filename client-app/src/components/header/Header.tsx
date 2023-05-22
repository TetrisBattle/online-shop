import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { ReactComponent as Logo } from 'assets/Logo.svg'
import { RouteOption } from 'app/Routes'
import HeaderMenu from './HeaderMenu'
import HeaderButton from './HeaderButton'
import DarkThemeIconButton from '../DarkThemeIconButton'

export default function Header() {
	return (
		<AppBar>
			<Toolbar
				sx={{
					p: 1,
					'.MuiIconButton-root': { color: 'inherit' },
				}}
			>
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
				<DarkThemeIconButton />
				<IconButton component={Link} to={RouteOption.Login}>
					<AccountCircleIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}
