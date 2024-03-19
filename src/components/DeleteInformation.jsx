import { useEffect, useRef } from 'react'
import Modal from './UI/Modal.jsx'
import Button from './UI/Button.jsx'

export default function DeleteInformation({ open, deletedElement, deletedInformation, onDelete, onCancel, onClose }) {
	const deleteRef = useRef()
	useEffect(() => {
		if (open) deleteRef.current.showModal()
	}, [open])

	return (
		<Modal ref={deleteRef} onClose={onClose}>
			<div className='flex flex-col gap-2.4'>
				<h2 className='text-hl text-red'>Delete this {deletedElement}?</h2>
				<p className='text-medium-grey text-bodyl '>{deletedInformation}</p>
				<div className='flex flex-col w-full tablet:flex-row gap-1.6'>
					<Button
						className='h-4 text-bodyl font-bold text-white bg-red rounded-2 tablet:w-full  hover:bg-red-hover dark:hover:bg-red-hover   focus:bg-red-hover dark:focus:bg-red-hover focus:outline focus:outline-0 transition-color duration-300'
						onClick={() => {
							deleteRef.current.close()
							onDelete()
						}}
					>
						Delete
					</Button>
					<Button
						className='h-4 text-bodyl font-bold text-purple bg-purple-btn dark:bg-white rounded-2 tablet:w-full hover:text-white hover:bg-purple-hover dark:hover:bg-purple-hover  focus:text-white focus:bg-purple-hover dark:focus:bg-purple-hover focus:outline focus:outline-0 transition-color duration-300'
						onClick={() => {
							deleteRef.current.close()
							onCancel()
						}}
					>
						Cancel
					</Button>
				</div>
			</div>
		</Modal>
	)
}
