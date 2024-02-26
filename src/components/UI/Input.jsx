import { useState } from 'react'
import iconCross from '../../assets/icon-cross.svg'

export default function Input({ label, name, placeholder = '', cross, onRemove, id, className = '', ...props }) {
	const [error, setError] = useState(null)
	const classList = `h-4 w-full px-1.6 text-bodyl text-black dark:text-white border rounded-0.4  bg-transparent placeholder:opacity-25 ${
		error ? 'border-red' : 'border-medium-grey-input'
	} ${className}`

	const handlerBlurInput = e => {
		e.target.value.trim() === '' ? setError('This field cannot be empty.') : setError(null)
	}
	const handlerFocusInput = ()=> {
		setError(null)
	}

	return (
		<div className='flex flex-col gap-0.8'>
			{label && (
				<label htmlFor={`${name}${id ? id : ''}`} className='text-medium-grey dark:text-white text-1.2 font-bold'>
					{label}
				</label>
			)}
			<div className='flex gap-1.6 items-center'>
				<input
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
				{cross && <img src={iconCross} onClick={onRemove} alt='' className='h-1.5' />}
			</div>
			{error && <p className='text-1.2 font-bold text-medium-grey dark:text-white'>{error}</p>}
		</div>
	)
}
