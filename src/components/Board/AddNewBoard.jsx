import Input from '../UI/Input.jsx'
import Modal from '../UI/Modal.jsx'
import Button from '../UI/Button.jsx'
import { useEffect, useRef, useState } from 'react'

export default function AddNewBoard({ open, onClose, boards, onAddBoard: addBoard }) {
	const [newBoard, setNewBoard] = useState({ name: '', columns: [{ name: '', tasks: [] }] })
	const [error, setError] = useState(null)

	const modalRef = useRef()
	useEffect(() => {
		open && modalRef.current.showModal()
	}, [open])
	const handlerAddNewColumn = () => {
		setNewBoard(prevColumns => {
			const prevBoard = { ...prevColumns }
			let prevCols = [...prevBoard.columns]
			prevCols.push({ name: '' })
			prevBoard.columns = prevCols
			return prevBoard
		})
	}

	const handlerEnteredNameColumn = (e, id) => {
		setNewBoard(prevColumns => {
			const prevBoard = { ...prevColumns }
			prevBoard.columns[id].name = e.target.value
			return prevBoard
		})
	}
	const handlerEnteredBoardName = e => {
		setNewBoard(prevBoard => {
			return { ...prevBoard, name: e.target.value }
		})
	}
	const handlerRemoveColumn = id => {
		setNewBoard(prevColumns => {
			const prevCols = [...prevColumns.columns]
			prevCols.splice(id, 1)
			return { ...prevColumns, columns: prevCols }
		})
	}

	const handlerAddBoard = e => {
		e.preventDefault()

		const emptyColumnName = newBoard.columns.some(column => column.name.trim() === '')
		if (emptyColumnName) {
			setError('Fill in all fields.')
			return
		}
		if (newBoard.name.trim().length > 0 && newBoard.columns.length > 0) {
			const boardNameExist = boards.some(kanbanBoard => {
				return kanbanBoard.name.toLowerCase() === newBoard.name.toLowerCase()
			})
			if (boardNameExist) {
				setError('You are trying to add an existing board name. Use a different name.')
				return
			}
			if (!boardNameExist) addBoard(newBoard)

			setNewBoard({ name: '', columns: [{ name: '', tasks: [] }] })
			modalRef.current.close()
		}
	}

	return (
		<Modal
			ref={modalRef}
			onClose={() => {
				setNewBoard({ name: '', columns: [{ name: '' }] })
				setError(null)
				onClose()
			}}
		>
			<div className='flex flex-col gap-2.4'>
				<h2 className='text-hl text-black dark:text-white'>Add New Board</h2>
				<form className='flex flex-col gap-2.4' onSubmit={handlerAddBoard}>
					<Input
						id='boardName'
						key='boardName'
						label='Board Name'
						type='text'
						placeholder='e.g. Web Design'
						value={newBoard.name}
						onChange={handlerEnteredBoardName}
					/>
					<div className='flex flex-col gap-1.2'>
						{newBoard.columns.map((column, id) => {
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
									error={error}
									name='boardColumns'
									type='text'
									placeholder='Todo'
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
