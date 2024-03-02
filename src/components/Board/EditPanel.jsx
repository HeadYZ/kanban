import Button from '../UI/Button.jsx'

export default function EditPanel({ open, showPanel, showDeleteWarning, onClose ,editInfo,deleteInfo, position}) {
	return (
		<div
			className={`flex flex-col gap-1.6 drop-shadow-md ${
				open ? 'absolute' : 'hidden'
			} ${position} w-19.2 p-1.6 z-10 bg-white dark:bg-v-dark-grey rounded-0.8`}
		>
			<Button
				className='text-bodyl text-medium-grey text-left'
				onClick={() => {
					onClose()
					showPanel()
				}}
			>
				{editInfo}
			</Button>
			<Button
				className='text-bodyl text-red text-left'
				onClick={() => {
					onClose()
					showDeleteWarning()
				}}
			>
				{deleteInfo}
			</Button>
		</div>
	)
}
