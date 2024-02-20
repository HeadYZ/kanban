import { useContext, useEffect, useRef, useState } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'
import Modal from '../UI/Modal.jsx'
import Input from '../UI/Input.jsx'
import Button from '../UI/Button.jsx'
const initialValue = { name: '', columns: [{ name: '' }] }

export default function EditBoard({ open, onClose }) {
	const { boards, activeBoard, editBoard } = useContext(KanbanContex)
	const editBoardRef = useRef()
	const [existingBoard, setExistingBoard] = useState(initialValue)
	const [deleteColumn, setDeleteColumn] = useState({ show: false, id: '' })
	useEffect(() => {
		const currentBoard = boards.find(board => board.name === activeBoard)
		if (currentBoard) setExistingBoard(currentBoard)
	}, [boards, activeBoard])
	useEffect(() => {
		if (open) editBoardRef.current.showModal()
	}, [open])

	const handlerAddNewColumn = () => {
		setExistingBoard(prevBoard => {
			const prevColumns = [...prevBoard.columns]
			prevColumns.push({ name: '', tasks: [] })

			return { ...prevBoard, columns: prevColumns }
		})
	}

	const handlerChangeBoardName = e => {
		setExistingBoard(prevBoard => {
			return { ...prevBoard, name: e.target.value }
		})
	}
	const handlerChangeColumnName = (e, id) => {
		setExistingBoard(prevBoard => {
			let prevColumns = [...prevBoard.columns]
			prevColumns[id].name = e.target.value
			return { ...prevBoard, columns: prevColumns }
		})
	}
	const handlerShowDeleteModal = id => {
		setDeleteColumn({ show: true, id })
	}

	const handlerDeleteColumn = () => {
		setExistingBoard(prevBoard => {
			let prevColumns = [...prevBoard.columns]
			prevColumns.splice(deleteColumn.id, 1)
			return { ...prevBoard, columns: prevColumns }
		})
		setDeleteColumn({ show: false, id: '' })
	}
	const handlerUpdateBoard = e => {
		e.preventDefault()

		const emptyColumnName = existingBoard.columns.some(column => column.name.trim() === '')
		if (emptyColumnName) {
			// setError('Fill in all fields.')
			return
		}
		if (existingBoard.name.trim().length > 0) {
			editBoard(existingBoard, activeBoard)
			editBoardRef.current.close()
		}
	}
	if (deleteColumn.show)
		return (
			<Modal>
				<div className='flex flex-col gap-2.4'>
					<h2 className='text-hl text-red'>Delete this task?</h2>
					<p className='text-medium-grey text-bodyl '>
						Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be
						reversed.
					</p>
					<div className='flex flex-col w-full tablet:flex-row gap-1.6'>
						<button
							className='h-4 text-bodyl font-bold text-white bg-red rounded-2 tablet:w-full'
							onClick={handlerDeleteColumn}
						>
							Delete
						</button>
						<button className='h-4 text-bodyl font-bold text-purple bg-white rounded-2 tablet:w-full'>Cancel</button>
					</div>
				</div>
			</Modal>
		)
	return (
		<Modal ref={editBoardRef} onClose={onClose}>
			<div className='flex flex-col gap-2.4'>
				<h2 className='text-hl text-black dark:text-white'>Edit Board</h2>
				<form className='flex flex-col gap-2.4' onSubmit={handlerUpdateBoard}>
					<Input
						id='boardName'
						key='boardName'
						label='Board Name'
						type='text'
						placeholder='e.g. Web Design'
						value={existingBoard.name}
						onChange={e => {
							handlerChangeBoardName(e)
						}}
					/>
					<div className='flex flex-col gap-1.2'>
						{existingBoard.columns.map((column, id) => {
							return (
								<Input
									key={id}
									id={id}
									value={column.name}
									label={id === 0 && 'Board Columns'}
									onChange={e => {
										handlerChangeColumnName(e, id)
									}}
									onRemove={() => {
										handlerShowDeleteModal(id)
									}}
									// error={error}
									name='boardColumns'
									type='text'
									placeholder='Todo'
									cross
								/>
							)
						})}
						{/* {error && <p className='text-1.2 font-bold text-medium-grey dark:text-white'>{error}</p>} */}
						<Button
							type='button'
							className='h-4 w-full text-center bg-purple-btn dark:bg-white text-bodyl font-bold  text-purple border-none rounded-2'
							onClick={handlerAddNewColumn}
						>
							+ Add New Column
						</Button>
					</div>
					<Button type='submit' className='w-full h-4 text-white bg-purple text-bodyl font-bold  rounded-2'>
						Save Changes
					</Button>
				</form>
			</div>
		</Modal>
	)
}
