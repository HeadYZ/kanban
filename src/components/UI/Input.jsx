import { useState } from 'react'
import IconCross from '../../assets/IconCross.jsx'

export default function Input({ label, name, placeholder = '', cross, onRemove, id, className = '', ...props }) {
	const [error, setError] = useState(null)
	const classList = `h-4 w-full px-1.6 text-bodyl text-black dark:text-white border rounded-0.4  bg-transparent placeholder:opacity-25 ${
		error ? 'border-red' : 'border-medium-grey-input'
	} ${className} lg:hover:border-purple lg:focus:border-purple lg:focus:outline lg:focus:outline-0 cursor-pointer lg:transition-color lg:duration-300 `

	const handlerBlurInput = e => {
		e.target.value.trim() === '' ? setError('This field cannot be empty.') : setError(null)
	}
	const handlerFocusInput = () => {
		setError(null)
	}

	return (
		<div className='flex flex-col gap-0.8 '>
			{label && (
				<label
					htmlFor={`${name}${id ? id : ''}`}
					className='text-medium-grey dark:text-white text-1.2 font-bold pointer-events-none'
				>
					{label}
				</label>
			)}
			<div className='flex relative gap-1.6 items-center'>
				<input
					id={`${name}${id ? id : ''}`}
					name={name}
					placeholder={placeholder}
					onBlur={e => {
						handlerBlurInput(e)
					}}
					onFocus={handlerFocusInput}
					className={classList}
					autoFocus={false}
					{...props}
				/>
				{error && (
					<span className={`absolute ${cross ? 'right-3.7 tablet:right-4.7' : 'right-1.6'} text-red text-bodym -z-10`}>
						Can't be empty
					</span>
				)}
				{cross && (
					<button type='button' onClick={onRemove} className='group' autoFocus={false}>
						<IconCross error={error} />
					</button>
				)}
			</div>
		</div>
	)
}
