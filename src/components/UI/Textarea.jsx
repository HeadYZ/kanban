import { useState } from 'react'

export default function TextArea({ label, name, placeholder = '', id, className = '', ...props }) {
	const [error, setError] = useState(null)
	const classList = `h-11.2 px-1.4 py-1 text-bodyl text-black dark:text-white border rounded-0.4  bg-transparent placeholder:opacity-25 ${
		error ? 'border-red' : 'border-medium-grey-input'
	} ${className}`

	const handlerBlurInput = e => {
		e.target.value.trim() === '' ? setError('The name cannot be empty.') : setError(null)
	}
	const handlerFocusInput = () => {
		setError(null)
	}

	return (
		<div className='flex flex-col gap-0.8'>
			<label htmlFor={`${name}${id ? id : ''}`} className='text-medium-grey dark:text-white text-1.2 font-bold'>
				{label}
			</label>

			<textarea
				id={`${name}${id ? id : ''}`}
				name={name}
				placeholder={placeholder}
				onBlur={e => {
					handlerBlurInput(e)
				}}
				onFocus={handlerFocusInput}
				className={classList}
				{...props}
			/>

			{error && <p className='text-1.2 font-bold text-medium-grey dark:text-white'>{error}</p>}
		</div>
	)
}
