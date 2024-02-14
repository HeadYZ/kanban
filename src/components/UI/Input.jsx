import iconCross from '../../assets/icon-cross.svg'

export default function Input({ label, name, placeholder = '', cross, ...props }) {
	return (
		<div className='flex flex-col gap-0.8'>
			{label && (
				<label htmlFor={name} className='text-medium-grey dark:text-white text-1.2 font-bold'>
					{label}
				</label>
			)}
			<div className='flex gap-1.6 items-center'>
				<input
					id={name}
					name={name}
					placeholder={placeholder}
					{...props}
					className='h-4 w-full px-1.6 text-bodyl text-black dark:text-white border rounded-0.4 border-medium-grey-input bg-transparent placeholder:opacity-25'
				/>
				{cross && <img src={iconCross} alt='' className='h-1.5' />}
			</div>
		</div>
	)
}
