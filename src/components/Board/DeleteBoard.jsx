import { useContext, useEffect, useRef, useState } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'
import Modal from '../UI/Modal.jsx'
import Input from '../UI/Input.jsx'
import Button from '../UI/Button.jsx'

export default function DeleteBoard({ currentBoard,onDelete, onCancel }) {
	const boardRef = useRef()
    useEffect(() => {
		if (open) boardRef.current.showModal()
	}, [open])
	return (
		<Modal ref={boardRef}>
			<div className='flex flex-col gap-2.4'>
				<h2 className='text-hl text-red'>Delete this board?</h2>
				<p className='text-medium-grey text-bodyl '>
					Are you sure you want to delete the ‘{currentBoard}’ board? This action will remove all columns and tasks and
					cannot be reversed.
				</p>
				<div className='flex flex-col w-full tablet:flex-row gap-1.6'>
					<Button
						className='h-4 text-bodyl font-bold text-white bg-red rounded-2 tablet:w-full'
						onClick={() => {
							boardRef.current.close()
							onDelete()
						}}
					>
						Delete
					</Button>
					<Button
						className='h-4 text-bodyl font-bold text-purple bg-white rounded-2 tablet:w-full'
						onClick={() => {
							boardRef.current.close()
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
