import { useContext, useEffect, useRef, useState } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'
import Modal from '../UI/Modal.jsx'
import Input from '../UI/Input.jsx'
import Button from '../UI/Button.jsx'
import checkColsName from '../../helpers/checkColsName.js'
import checkBoardName from '../../helpers/checkBoardName.js'

export default function EditBoard({
	open,
	onClose: closeEditBoard,
	showWarning,
	deleteCol,
	deleteColId,
	clearDeleteState,
}) {
	const { boards, activeBoard, editBoard } = useContext(KanbanContex)
	const editBoardRef = useRef()
	const [existingBoard, setExistingBoard] = useState({ name: '', columns: [{ name: '' }] })
	const [error, setError] = useState(null)

	useEffect(() => {
		const currentBoard = boards.find(board => board.name === activeBoard)
		if (currentBoard) setExistingBoard(currentBoard)
	}, [boards, activeBoard])

	useEffect(() => {
		if (open) editBoardRef.current.showModal()
	}, [open])

	useEffect(() => {
		if (deleteCol) {
			setExistingBoard(prevBoard => {
				let prevColumns = [...prevBoard.columns]
				prevColumns.splice(deleteColId, 1)
				return { ...prevBoard, columns: prevColumns }
			})

			clearDeleteState()
		}
	}, [deleteCol])

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

	const handlerUpdateBoard = e => {
		e.preventDefault()

		const emptyColumnName = existingBoard.columns.some(column => column.name.trim() === '')
		if (emptyColumnName) {
			setError('Fill in all fields.')
			return
		}

		const duplicateColName = checkColsName(existingBoard.columns)
		if (duplicateColName) {
			setError('You are trying to add the same column names. Use different names.')
			return
		}
		const duplicateBoardName = checkBoardName(existingBoard.name, boards, activeBoard)
		if (duplicateBoardName) {
			setError('You already have a board with this name. Use a different name.')
			return
		}
		if (existingBoard.name.trim().length > 0) {
			editBoard(existingBoard, activeBoard)
			editBoardRef.current.close()
		}
	}

	return (
		<Modal ref={editBoardRef} onClose={closeEditBoard} open={open}>
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
						autoFocus={false}
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
										editBoardRef.current.close()
										showWarning(id, column.name)
									}}
									name='boardColumns'
									type='text'
									placeholder='Todo'
									cross={existingBoard.columns.length > 1 ? true : false}
								/>
							)
						})}
						{error && <p className='text-1.2 font-bold text-medium-grey dark:text-white'>{error}</p>}
						<Button
							type='button'
							className='h-4 w-full text-center bg-purple-btn dark:bg-white text-bodyl font-bold  text-purple border-none rounded-2 lg:hover:text-white lg:hover:bg-purple-hover lg:dark:hover:bg-purple-hover  lg:focus:text-white lg:focus:bg-purple-hover lg:dark:focus:bg-purple-hover lg:focus:outline lg:focus:outline-0 lg:transition-color lg:duration-300'
							onClick={handlerAddNewColumn}
							autoFocus={false}
						>
							+ Add New Column
						</Button>
					</div>
					<Button
						type='submit'
						className='w-full h-4 text-white bg-purple text-bodyl font-bold  rounded-2 lg:hover:bg-purple-hover lg:focus:bg-purple lg:focus:outline lg:focus:outline-0 lg:transition-color lg:duration-300'
						autoFocus={false}
					>
						Save Changes
					</Button>
				</form>
			</div>
		</Modal>
	)
}
