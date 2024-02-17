import Input from '../UI/Input.jsx'
import Modal from '../UI/Modal.jsx'
import Button from '../UI/Button.jsx'
import { useEffect, useRef, useState } from 'react'
export default function AddNewBoard({ open, onClose }) {
	const [boardColumns, setBoardColumns] = useState([''])
	const modalRef = useRef()
	console.log('generuje sie')
	useEffect(() => {
		open && modalRef.current.showModal()
	}, [open])

	const handlerAddNewColumn = () => {
		setBoardColumns(prevColumns => {
			return [...prevColumns, '']
		})
	}

	const handlerEnteredNameColumn = (e, id) => {
		let enteredColumnName = e.target.value
		setBoardColumns(prevColumns => {
			let prevCols = prevColumns
			prevCols[id] = enteredColumnName
			return [...prevCols]
		})
	}
	const handlerRemoveColumn = id => {
		setBoardColumns(prevColumns => {
			let prevCols = prevColumns.splice(id, 1)
			console.log(prevCols)
			return [...prevColumns]
		})
	}

	return (
		<Modal
			ref={modalRef}
			onClose={onClose}
			className='top-2/4 -translate-y-2/4 w-11/12 p-2.4 mx-auto bg-white dark:bg-dark-grey rounded-0.6 '
		>
			<div className='flex flex-col gap-2.4'>
				<h2 className='text-hl text-black dark:text-white'>Add New Board</h2>
				<form className='flex flex-col gap-2.4'>
					<Input id='boardName' label='Board Name' type='text' placeholder='e.g. Web Design' />
					<div className='flex flex-col gap-1.2'>
						{boardColumns.map((column, id) => (
							<Input
								key={`${id}${Math.random()}`}
								id={id}
								value={column}
								onChange={e => {
									handlerEnteredNameColumn(e, id)
								}}
								onRemove={() => {
									handlerRemoveColumn(id)
								}}
								name='boardColumns'
								type='text'
								placeholder='Todo'
								cross
							/>
						))}
						<Button
							type='button'
							className='h-4 w-full text-center bg-purple-btn dark:bg-white text-bodyl font-bold  text-purple border-none rounded-2'
							onClick={handlerAddNewColumn}
						>
							+ Add New Column
						</Button>
					</div>
					<Button className='w-full h-4 text-white bg-purple text-bodyl font-bold  rounded-2'>Save Changes</Button>
				</form>
			</div>
		</Modal>
	)
}
