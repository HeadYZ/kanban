import iconDown from '../../assets/icon-chevron-down.svg'

export default function Select({ label, options, ...props }) {
	return (
		<div className='flex flex-col gap-0.8 relative'>
			<label htmlFor={label} className='text-medium-grey dark:text-white text-1.2 font-bold'>
				{label}
			</label>
			<select
				name={label}
				id={label}
				className='relative appearance-none h-4 w-full px-1.6 text-bodyl text-black dark:text-white border rounded-0.4  bg-transparent placeholder:opacity-25 border-medium-grey-input cursor-pointer'
				{...props}
			>
				{options.map(option => (
					<option key={option} className='bg-white text-black dark:text-white dark:bg-dark-grey' value={option}>
						{option}
					</option>
				))}
			</select>
			<img src={iconDown} alt='' className='absolute right-1.6 top-4 translate-y-2/4' />
		</div>
	)
}
