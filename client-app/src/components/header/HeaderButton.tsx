import { Button } from '@mui/material'
import { RouteOption, routeToTitle } from 'app/Routes'
import { NavLink } from 'react-router-dom'

interface HeaderButtonProps {
	route: RouteOption
}

export default function HeaderButton({ route }: HeaderButtonProps) {
	return (
		<Button
			component={NavLink}
			to={route}
			variant='text'
			sx={(theme) => ({
				'&:hover': { bgcolor: 'transparent' },
				fontSize: '1.25rem',
				fontWeight: (theme) => theme.typography.fontWeightRegular,
				color: 'inherit',
				'&.active': theme.palette.mode === 'dark' && {
					color: theme.palette.primary.main,
				},
			})}
		>
			{routeToTitle(route)}
		</Button>
	)
}
