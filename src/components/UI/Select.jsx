import iconDown from '../../assets/icon-chevron-down.svg'

export default function Select({ label, options }) {
	return (
		<div className='relative'>
			<label htmlFor={label}></label>
			<select
				name={label}
				id={label}
				className='relative appearance-none h-4 w-full px-1.6 text-bodyl text-black dark:text-white border rounded-0.4  bg-transparent placeholder:opacity-25 border-medium-grey-input'
			>
				{options.map(option => (
					<option className='bg-white text-black dark:text-white dark:bg-dark-grey' value={option.toLowerCase()}>
						{option}
					</option>
				))}
			</select>
			<img src={iconDown} alt='' className='absolute right-1.6 top-2/4 -translate-y-2/4' />
		</div>
	)
}
