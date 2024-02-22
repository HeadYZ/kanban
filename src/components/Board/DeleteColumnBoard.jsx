import { useEffect, useRef, useState } from 'react'
import Modal from '../UI/Modal.jsx'
import Button from '../UI/Button.jsx'

export default function DeleteColumnBoard({ open, onClose, deleteCol }) {
	const deleteColRef = useRef()
	useEffect(() => {
		if (open) deleteColRef.current.showModal()
	}, [open])

	return (
		<Modal ref={deleteColRef} onClose={onClose}>
			<div className='flex flex-col gap-2.4'>
				<h2 className='text-hl text-red'>Delete this task?</h2>
				<p className='text-medium-grey text-bodyl '>
					Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.
				</p>
				<div className='flex flex-col w-full tablet:flex-row gap-1.6'>
					<Button
						className='h-4 text-bodyl font-bold text-white bg-red rounded-2 tablet:w-full'
						onClick={() => {
							deleteColRef.current.close()
							deleteCol()
						}}
					>
						Delete
					</Button>
					<Button className='h-4 text-bodyl font-bold text-purple bg-white rounded-2 tablet:w-full'>Cancel</Button>
				</div>
			</div>
		</Modal>
	)
}
