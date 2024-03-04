import { useContext, useEffect, useRef, useState } from 'react'
import Modal from '../UI/Modal.jsx'
import Button from '../UI/Button.jsx'
import Input from '../UI/Input.jsx'
import KanbanContex from '../../store/KanbanContex.jsx'

export default function ({ open, onClose, currentBoard }) {
	const [boardColumns, setBoardColumns] = useState([{ name: '', tasks: [] }])
	const [error, setError] = useState(null)
	const { addNewColumn } = useContext(KanbanContex)
	const addColRef = useRef()
	useEffect(() => {
		open && addColRef.current.showModal()
	}, [open])
	const handlerEnteredNameColumn = (e, id) => {
		setBoardColumns(prevColumns => {
			const prevBoard = [...prevColumns]
			prevBoard[id].name = e.target.value
			return [...prevBoard]
		})
	}
	const handlerAddNewColumn = () => {
		setBoardColumns(prevColumns => {
			const columns = [...prevColumns]
			columns.push({ name: '', tasks: [] })
			return [...columns]
		})
	}

	const handlerRemoveColumn = id => {
		setBoardColumns(prevColumns => {
			const prevCols = [...prevColumns.columns]
			prevCols.splice(id, 1)
			return { ...prevColumns, columns: prevCols }
		})
	}
	console.log(currentBoard)
	const handlerOnSubmit = e => {
		e.preventDefault()
		let emptyColumnName = false
		if (boardColumns && boardColumns.length > 0) {
			emptyColumnName = boardColumns.some(column => column.name.trim() === '')
		}

		if (boardColumns && boardColumns.length > 0 && emptyColumnName) {
			setError('Fill in all fields.')
			return
		}
		if (boardColumns && boardColumns.length > 0 && !emptyColumnName) {
			
			addNewColumn(boardColumns)
		}
		setBoardColumns([{ name: '', tasks: [] }])
		addColRef.current.close()
	}

	return (
		<Modal ref={addColRef} onClose={onClose}>
			<div className='flex flex-col gap-2.4'>
				<h2 className='text-hl text-black dark:text-white'>Add New Column</h2>
				<form className='flex flex-col gap-2.4' onSubmit={handlerOnSubmit}>
					<div className='flex flex-col gap-1.2'>
						{boardColumns.map((column, id) => {
							return (
								<Input
									key={id}
									id={id}
									value={column.name}
									label={id === 0 && 'Board Columns'}
									onChange={e => {
										handlerEnteredNameColumn(e, id)
									}}
									onRemove={() => {
										handlerRemoveColumn(id)
									}}
									name='boardColumns'
									type='text'
									placeholder='e.g. Todo'
									cross
								/>
							)
						})}
						{error && <p className='text-1.2 font-bold text-medium-grey dark:text-white'>{error}</p>}
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
