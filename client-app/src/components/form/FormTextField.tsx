import { MenuItem, TextField, TextFieldProps } from '@mui/material'
import { useField } from 'formik'

export interface SelectOption {
	value: string
	label: string
}

type FormTextFieldProps = Omit<TextFieldProps, 'select'> & {
	name: string
	isNumberInput?: boolean
	options?: SelectOption[]
}

function FormTextField({
	name,
	isNumberInput,
	options,
	...otherProps
}: FormTextFieldProps) {
	const [field, meta, helpers] = useField(name)

	if (isNumberInput) {
		return (
			<TextField
				{...field}
				error={meta.touched && !!meta.error}
				helperText={meta.touched && meta.error}
				onChange={(e) => {
					const value = e.target.value
					if (value === '') {
						helpers.setValue('')
						return
					}
					if (Number(value) && !/\s/.test(value)) {
						helpers.setValue(value)
					}
				}}
				{...otherProps}
			/>
		)
	}

	return options ? (
		<TextField
			{...field}
			error={meta.touched && !!meta.error}
			helperText={meta.touched && meta.error}
			select
			{...otherProps}
		>
			{options.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.value}
				</MenuItem>
			))}
		</TextField>
	) : (
		<TextField
			{...field}
			error={meta.touched && !!meta.error}
			helperText={meta.touched && meta.error}
			{...otherProps}
		/>
	)
}

export default FormTextField
