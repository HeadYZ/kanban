import { useEffect, useRef, useState } from 'react'
import Input from '../UI/Input'
import Modal from '../UI/Modal.jsx'
import TextArea from '../UI/Textarea.jsx'
import Button from '../UI/Button.jsx'
import Select from '../UI/Select.jsx'

const initialState = {
	description: '',
	status: 'Todo',
	subtasks: [
		{ isCompleted: false, title: '' },
		{ isCompleted: false, title: '' },
	],
	title: '',
}

export function AddNewTask() {
	const [newTask, setNewTask] = useState(initialState)
	const [error, setError] = useState(null)
	const addTaskRef = useRef()
	useEffect(() => {
		addTaskRef.current.showModal()
	}, [])
	console.log(newTask)
	const handlerEnteredTaskTitle = e => {
		setNewTask(prevTask => {
			return { ...prevTask, title: e.target.value }
		})
	}
	const handlerAddNewSubtask = () => {
		setNewTask(prevTask => {
			const prevSubtasks = [...prevTask.subtasks]
			prevSubtasks.push({ isCompleted: false, title: '' })

			return { ...prevTask, subtasks: prevSubtasks }
		})
	}

	const handlerEnteredSubtaskTitle = (e, id) => {
		setNewTask(prevTask => {
			const prevSubtasks = [...prevTask.subtasks]
			prevSubtasks[id] = { isCompleted: false, title: e.target.value }
			return { ...prevTask, subtasks: prevSubtasks }
		})
	}
	const handlerEnteredTaskDescription = e => {
		setNewTask(prevTask => {
			return { ...prevTask, description: e.target.value }
		})
	}
	const handlerRemoveSubtask = id => {
		setNewTask(prevTask => {
			const prevSubtasks = [...prevTask.subtasks]
			prevSubtasks.splice(id, 1)
			return { ...prevTask, subtasks: prevSubtasks }
		})
	}

	const handlerAddTask = e => {
		e.preventDefault()

		const emptySubtask = newTask.subtasks.some(subtask => subtask.title.trim() === '')
		const emptyDescription = newTask.description.trim() === ''
		const emptyTitle = newTask.title.trim() === ''

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
		setError(null)
	}

	return (
		<Modal ref={addTaskRef}>
			<form action='' className='flex flex-col gap-2.4' onSubmit={handlerAddTask}>
				<h3 className='text-hl text-black dark:text-white'>Add New Task</h3>
				<Input
					key='title'
					id={'title'}
					label='Title'
					placeholder='e.g. Take coffe break'
					value={newTask.title}
					onChange={handlerEnteredTaskTitle}
				></Input>
				<TextArea
					label='Description'
					placeholder={`e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.`}
					value={newTask.description}
					onChange={e => {
						handlerEnteredTaskDescription(e)
					}}
				></TextArea>
				<div className='flex flex-col gap-1.2'>
					{newTask.subtasks.map((subtask, id) => {
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
				<Select label='Status' options={['Todo', 'Doing', 'Done']}></Select>
				{error && <p className='text-1.2 font-bold text-medium-grey dark:text-white'>{error}</p>}
				<Button
					type='submit'
					className='h-4 w-full text-center bg-purple text-white text-bodyl font-bold border-none rounded-2'
				>
					Create Task
				</Button>
			</form>
		</Modal>
	)
}
