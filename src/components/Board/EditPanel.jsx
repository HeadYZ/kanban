import { useEffect } from 'react'
import Button from '../UI/Button.jsx'

export default function EditPanel({ open, showPanel, showDeleteWarning, onClose, editInfo, deleteInfo, position }) {
	const handlerClosePanel = e => {
		const clickedEditPanel = e.target.closest('#editPanel')
		const clickedEditIconPanel = e.target.closest('.edit-panel-icon')
		if (clickedEditIconPanel === null && clickedEditPanel === null) {
			onClose()
		} else {
			return
		}
	}

	useEffect(() => {
		open === true && window.addEventListener('click', handlerClosePanel)
	}, [open])

	return (
		<div
			id='editPanel'
			className={`flex flex-col gap-1.6 drop-shadow-md absolute ${
				open ? 'opacity-100 z-10' : 'opacity-0 -z-40'
			} ${position} w-19.2 p-1.6  bg-white dark:bg-v-dark-grey rounded-0.8 transition-opacity duration-300`}
		>
			<Button
				className='text-bodyl text-medium-grey text-left lg:hover:scale-95 lg:transition-transform lg:duration-300'
				onClick={() => {
					onClose()
					showPanel()
				}}
			>
				{editInfo}
			</Button>
			<Button
				className='text-bodyl text-red text-left lg:hover:scale-95 lg:transition-transform lg:duration-300'
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
