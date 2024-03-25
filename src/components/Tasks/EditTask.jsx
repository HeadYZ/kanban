import { useContext, useEffect, useRef, useState } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'
import Modal from '../UI/Modal.jsx'
import Button from '../UI/Button.jsx'
import Select from '../UI/Select.jsx'
import TextArea from '../UI/Textarea.jsx'
import Input from '../UI/Input.jsx'
import checkDuplicateName from '../../helpers/checkDuplicateName.js'
import checkDuplicateTitle from '../../helpers/checkDuplicateTitle.js'

export default function EditTask({ open, task, onClose, status: oldStatus, closeTask }) {
	const [editedTask, setEditedTask] = useState(task)
	const [error, setError] = useState(null)
	const { editTask, findCurrentBoard } = useContext(KanbanContex)
	const editTaskRef = useRef()

	const currentBoard = findCurrentBoard()
	const filtredStatus = currentBoard?.columns
		.map(status => {
			if (status.name !== oldStatus) {
				return status.name
			}
			return
		})
		.filter(status => status !== undefined)
	const availableStatus = [oldStatus, ...filtredStatus]
	useEffect(() => {
		open && editTaskRef.current.showModal()
	}, [open])
	const handlerEnteredTaskTitle = e => {
		setEditedTask(prevTask => {
			return { ...prevTask, title: e.target.value }
		})
	}
	const handlerAddNewSubtask = () => {
		setEditedTask(prevTask => {
			const prevSubtasks = [...prevTask.subtasks]
			prevSubtasks.push({ isCompleted: false, title: '' })
			return { ...prevTask, subtasks: prevSubtasks }
		})
	}

	const handlerEnteredSubtaskTitle = (e, id) => {
		setEditedTask(prevTask => {
			const prevSubtasks = [...prevTask.subtasks]
			prevSubtasks[id] = { isCompleted: false, title: e.target.value }
			return { ...prevTask, subtasks: prevSubtasks }
		})
	}
	const handlerEnteredTaskDescription = e => {
		setEditedTask(prevTask => {
			return { ...prevTask, description: e.target.value }
		})
	}
	const handlerRemoveSubtask = id => {
		setEditedTask(prevTask => {
			const prevSubtasks = [...prevTask.subtasks]
			prevSubtasks.splice(id, 1)
			return { ...prevTask, subtasks: prevSubtasks }
		})
	}
	const handlerChoosedStatus = e => {
		setEditedTask(prevTask => {
			return { ...prevTask, status: e.target.value, statusIsChange: true }
		})
	}

	const handlerAddTask = e => {
		e.preventDefault()

		const emptySubtask = editedTask.subtasks.some(subtask => subtask.title.trim() === '')
		const emptyDescription = editedTask.description.trim() === ''
		const emptyTitle = editedTask.title.trim() === ''
		const isIdenticalTitle = checkDuplicateTitle(currentBoard.columns, editedTask.title, false, task.title)
		const isIdenticalSubtaskName = checkDuplicateName(editedTask.subtasks, 'title')
		if (emptyTitle) {
			setError('Fill task title.')
			return
		}
		if (isIdenticalTitle) {
			setError('You already have such a title in the selected board. Try using a different name.')
			return
		}
		if (emptyDescription) {
			setError('Fill task description.')
			return
		}
		if (emptySubtask) {
			setError('Fill all subtasks title.')
			return
		}
		if (isIdenticalSubtaskName) {
			setError('You are trying to add the same subtask names. Use different names.')
			return
		}

		editTask(editedTask, task.title, oldStatus)
		setError(null)
		editTaskRef.current.close()
		closeTask()
	}

	return (
		<Modal ref={editTaskRef} onClose={onClose} open={open}>
			<form className='flex flex-col gap-2.4' onSubmit={handlerAddTask}>
				<h3 className='text-hl text-black dark:text-white'>Edit Task</h3>
				<Input
					key='title'
					id={'title'}
					label='Title'
					placeholder='e.g. Take coffe break'
					value={editedTask.title}
					onChange={handlerEnteredTaskTitle}
				></Input>
				<TextArea
					label='Description'
					placeholder={`e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.`}
					value={editedTask.description}
					onChange={e => {
						handlerEnteredTaskDescription(e)
					}}
				></TextArea>
				<div className='flex flex-col gap-1.2'>
					{editedTask.subtasks.map((subtask, id) => {
						return (
							<Input
								key={id}
								id={id}
								value={subtask.title}
								label={id === 0 && 'Subtasks'}
								onChange={e => {
									handlerEnteredSubtaskTitle(e, id)
								}}
								onRemove={() => {
									handlerRemoveSubtask(id)
								}}
								name='Subtaks'
								type='text'
								placeholder={id === 0 ? 'e.g. Make Coffe' : 'e.g. Drink coffe & smile'}
								cross
							/>
						)
					})}

					<Button
						type='button'
						className='h-4 w-full text-center bg-purple-btn dark:bg-white text-bodyl font-bold  text-purple border-none rounded-2 lg:hover:text-white lg:hover:bg-purple-hover lg:dark:hover:bg-purple-hover  lg:focus:text-white lg:focus:bg-purple-hover lg:dark:focus:bg-purple-hover lg:focus:outline lg:focus:outline-0 lg:transition-color lg:duration-300'
						onClick={handlerAddNewSubtask}
					>
						+ Add New Subtask
					</Button>
				</div>
				<Select
					label='Status'
					key='Status'
					options={availableStatus}
					onChange={e => {
						handlerChoosedStatus(e)
					}}
				></Select>
				{error && <p className='text-1.2 font-bold text-medium-grey dark:text-white'>{error}</p>}
				<Button
					type='submit'
					className='h-4 w-full text-center bg-purple text-white text-bodyl font-bold border-none rounded-2 lg:hover:bg-purple-hover lg:focus:bg-purple lg:focus:outline lg:focus:outline-0 lg:transition-color lg:duration-300'
				>
					Save Changes
				</Button>
			</form>
		</Modal>
	)
}
