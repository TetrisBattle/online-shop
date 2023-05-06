import { Button, ButtonProps, CircularProgress } from '@mui/material'
import { useRef, useState } from 'react'

interface LoadingButtonProps extends ButtonProps {
	onClick: () => Promise<void>
}

function LoadingButton({ onClick, children, ...props }: LoadingButtonProps) {
	const loadingButtonRef = useRef<HTMLButtonElement>(null)
	const [isLoading, setIsLoading] = useState(false)

	async function handleClick() {
		setIsLoading(true)
		await onClick().finally(() => setIsLoading(false))
	}

	return (
		<Button
			ref={loadingButtonRef}
			onClick={handleClick}
			{...props}
			sx={{
				width: loadingButtonRef.current?.clientWidth,
				height: loadingButtonRef.current?.clientHeight,
				...props.sx,
			}}
		>
			{isLoading ? (
				<CircularProgress color='inherit' size={24} />
			) : (
				children
			)}
		</Button>
	)
}

export default LoadingButton
