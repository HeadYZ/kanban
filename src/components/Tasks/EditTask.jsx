import { useContext, useEffect, useRef, useState } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'
import Modal from '../UI/Modal.jsx'
import Button from '../UI/Button.jsx'
import Select from '../UI/Select.jsx'
import TextArea from '../UI/Textarea.jsx'
import Input from '../UI/Input.jsx'

export default function EditTask({ open, task, onClose }) {
	const [editTask, setEditTask] = useState(task)
	const [error, setError] = useState(null)
	const { boards, activeBoard, addTask } = useContext(KanbanContex)
	const editTaskRef = useRef()

	const currentBoard = boards.find(board => board.name === activeBoard)
	const availableStatus = currentBoard?.columns.map(status => {
		return status.name
	})

	useEffect(() => {
		open && editTaskRef.current.showModal()
	}, [open])
	const handlerEnteredTaskTitle = e => {
		setEditTask(prevTask => {
			return { ...prevTask, title: e.target.value }
		})
	}
	const handlerAddNewSubtask = () => {
		setEditTask(prevTask => {
			const prevSubtasks = [...prevTask.subtasks]
			prevSubtasks.push({ isCompleted: false, title: '' })
			return { ...prevTask, subtasks: prevSubtasks }
		})
	}

	const handlerEnteredSubtaskTitle = (e, id) => {
		setEditTask(prevTask => {
			const prevSubtasks = [...prevTask.subtasks]
			prevSubtasks[id] = { isCompleted: false, title: e.target.value }
			return { ...prevTask, subtasks: prevSubtasks }
		})
	}
	const handlerEnteredTaskDescription = e => {
		setEditTask(prevTask => {
			return { ...prevTask, description: e.target.value }
		})
	}
	const handlerRemoveSubtask = id => {
		setEditTask(prevTask => {
			const prevSubtasks = [...prevTask.subtasks]
			prevSubtasks.splice(id, 1)
			return { ...prevTask, subtasks: prevSubtasks }
		})
	}
	const handlerChoosedStatus = e => {
		setEditTask(prevTask => {
			return { ...prevTask, status: e.target.value, statusIsChange: true }
		})
	}

	const handlerAddTask = e => {
		e.preventDefault()

		const emptySubtask = editTask.subtasks.some(subtask => subtask.title.trim() === '')
		const emptyDescription = editTask.description.trim() === ''
		const emptyTitle = editTask.title.trim() === ''

		if (emptyTitle) {
			setError('Fill task title.')
			return
		} else if (emptyDescription) {
			setError('Fill task description.')
			return
		} else if (emptySubtask) {
			setError('Fill all subtasks title.')
			return
		}

		addTask(editTask)
		setEditTask(initialState)
		setError(null)
		editTaskRef.current.close()
	}

	return (
		<Modal ref={editTaskRef} onClose={onClose}>
			<form className='flex flex-col gap-2.4' onSubmit={handlerAddTask}>
				<h3 className='text-hl text-black dark:text-white'>Edit Task</h3>
				<Input
					key='title'
					id={'title'}
					label='Title'
					placeholder='e.g. Take coffe break'
					value={editTask.title}
					onChange={handlerEnteredTaskTitle}
				></Input>
				<TextArea
					label='Description'
					placeholder={`e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.`}
					value={editTask.description}
					onChange={e => {
						handlerEnteredTaskDescription(e)
					}}
				></TextArea>
				<div className='flex flex-col gap-1.2'>
					{editTask.subtasks.map((subtask, id) => {
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
						className='h-4 w-full text-center bg-purple-btn dark:bg-white text-bodyl font-bold  text-purple border-none rounded-2'
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
					className='h-4 w-full text-center bg-purple text-white text-bodyl font-bold border-none rounded-2'
				>
					Save Changes
				</Button>
			</form>
		</Modal>
	)
}
