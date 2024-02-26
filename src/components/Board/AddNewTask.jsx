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
	const [newSubtaks, addNewSubtask] = useState(initialState)
	const addTaskRef = useRef()
	useEffect(() => {
		addTaskRef.current.showModal()
	}, [])

	return (
		<Modal ref={addTaskRef}>
			<form action='' className='flex flex-col gap-2.4'>
				<h3 className='text-hl text-black dark:text-white'>Add New Task</h3>
				<Input label='Title' placeholder='e.g. Take coffe break'></Input>
				<TextArea
					label='Description'
					placeholder={`e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.`}
				></TextArea>
				<div className='flex flex-col gap-1.2'>
					{newSubtaks.subtasks.map((subtask, id) => {
						console.log(subtask)
						return (
							<Input
								key={id}
								id={id}
								value={subtask.title}
								label={id === 0 && 'Subtasks'}
								// onChange={e => {
								// 	handlerEnteredNameColumn(e, id)
								// }}
								// onRemove={() => {
								// 	handlerRemoveColumn(id)
								// }}
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
					>
						+ Add New Subtask
					</Button>
				</div>
				<Select label='Status' options={['Todo','Doing','Done']}></Select>
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
