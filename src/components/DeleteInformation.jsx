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
						className='h-4 text-bodyl font-bold text-white bg-red rounded-2 tablet:w-full  lg:hover:bg-red-hover lg:dark:hover:bg-red-hover   lg:focus:bg-red-hover lg:dark:focus:bg-red-hover focus:outline focus:outline-0 transition-color duration-300'
						onClick={() => {
							deleteRef.current.close()
							onDelete()
						}}
					>
						Delete
					</Button>
					<Button
						className='h-4 text-bodyl font-bold text-purple bg-purple-btn dark:bg-white rounded-2 tablet:w-full lg:hover:text-white lg:hover:bg-purple-hover lg:dark:hover:bg-purple-hover  lg:focus:text-white lg:focus:bg-purple-hover lg:dark:focus:bg-purple-hover lg:focus:outline lg:focus:outline-0 lg:transition-color lg:duration-300'
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
