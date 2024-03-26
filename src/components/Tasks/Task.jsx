import { useContext, useEffect, useRef, useState } from 'react'
import Modal from '../UI/Modal.jsx'
import iconVertical from '../../assets/icon-vertical-ellipsis.svg'
import downArrow from '../../assets/icon-chevron-down.svg'
import KanbanContex from '../../store/KanbanContex.jsx'
import Button from '../UI/Button.jsx'
import EditPanel from '../Board/EditPanel.jsx'
import EditTask from './EditTask.jsx'
import DeleteInformation from '../DeleteInformation.jsx'
import IconCheck from '../../assets/icon-check.svg'
export default function Task({ open, task, onClose, currentBoard, status: taskStatus }) {
	const [showPanel, setShowPanel] = useState({ editPanel: false, editTask: false })
	const [showDeleteInfo, setShowDeleteInfo] = useState(false)
	const taskRef = useRef()
	const { editSubtask, changeTaskStatus, deleteTask } = useContext(KanbanContex)
	useEffect(() => {
		open && taskRef.current.showModal()
	}, [open])

	const handlerShowDeleteInformation = () => {
		setShowDeleteInfo(true)
	}
	const handlerHideDeleteInformation = () => {
		setShowDeleteInfo(false)
	}

	const handlerChekboxSelect = (e, subtask) => {
		const prevSubtasks = [...task.subtasks]
		const subtaskId = prevSubtasks.findIndex(prevSubtask => prevSubtask.title === subtask.title)
		const subtaskIsCompleted = prevSubtasks[subtaskId].isCompleted
		prevSubtasks[subtaskId].isCompleted = !subtaskIsCompleted

		editSubtask({
			subtasks: prevSubtasks,
			status: task.status,
			board: currentBoard.name,
			taskTitle: task.title,
		})
	}

	const handlerChangeStatus = e => {
		const newStatus = e.target.value
		changeTaskStatus({ oldStatus: taskStatus, newStatus, board: currentBoard.name, taskTitle: task.title })
		taskRef.current.close()
	}
	const handlerShowEditTask = () => {
		setShowPanel(prevShow => {
			return { ...prevShow, editTask: true }
		})
	}

	const handlerHideEditTask = () => {
		setShowPanel(prevShow => {
			return { ...prevShow, editTask: false }
		})
	}
	const handlerShowEditPanel = () => {
		setShowPanel(prevShow => {
			return { ...prevShow, editPanel: true }
		})
	}
	const handlerCloseEditPanel = () => {
		setShowPanel(prevShow => {
			return { ...prevShow, editPanel: false }
		})
	}

	const status = currentBoard.columns.map(status => {
		return status.name
	})

	let completedSubtasks = 0
	task.subtasks.forEach(subtask => {
		if (subtask.isCompleted === true) completedSubtasks++
	})

	const handlerDeleteTask = () => {
		deleteTask(task.title, taskStatus)
		taskRef.current.close()
	}

	return (
		<>
			<Modal
				ref={taskRef}
				className='p-2.4 mx-auto bg-white dark:bg-dark-grey rounded-0.6 	top-2/4 -translate-y-2/4'
				onClose={onClose}
				open={open}
			>
				<div className='flex flex-col gap-1.6'>
					<header className='flex items-center justify-between relative w-full gap-1.6'>
						<h3 className='text-hl text-black dark:text-white '>{task.title}</h3>
						<Button
							className='flex items-center justify-center p-1 edit-panel-icon'
							onClick={handlerShowEditPanel}
							autoFocus={false}
						>
							<img src={iconVertical} alt='' className='h-2 w-0.462' />
						</Button>
						<EditPanel
							open={showPanel.editPanel}
							showPanel={handlerShowEditTask}
							onClose={handlerCloseEditPanel}
							editInfo='Edit Task'
							deleteInfo='Delete Task'
							showDeleteWarning={handlerShowDeleteInformation}
							position='top-4 -right-2 '
						></EditPanel>
					</header>

					<main className='flex flex-col gap-1.6'>
						<p className='mb-0.8 text-bodyl text-medium-grey'>{task.description}</p>
						<span className='text-bodym text-medium-grey dark:text-white'>
							Subtask ( {completedSubtasks} of {task.subtasks.length})
						</span>
						<ul className='flex flex-col gap-0.8'>
							{task.subtasks.map(subtask => {
								return (
									<li
										key={subtask.title}
										className='flex items-center gap-1.6 px-1.2 bg-light-grey dark:bg-v-dark-grey rounded-0.4 lg:hover:bg-purple-25 lg:dark:hover:bg-purple-25 lg:duration-300 lg:transition-color'
									>
										<div className='relative flex items-center'>
											<input
												type='checkbox'
												defaultChecked={subtask.isCompleted === true}
												onChange={e => {
													handlerChekboxSelect(e, subtask)
												}}
												id={subtask.title}
												className={`appearance-none w-1.6 h-1.6  ${
													subtask.isCompleted === true ? 'bg-purple dark:bg-purple' : 'bg-white dark:bg-dark-grey'
												} border border-[rgba(130,143,163,0.25)] rounded cursor-pointer  `}
											/>
											<img
												src={IconCheck}
												alt=''
												onClick={e => {
													handlerChekboxSelect(e, subtask)
												}}
												className={`${
													subtask.isCompleted === true ? 'absolute' : 'hidden'
												}    top-2/4 left-2/4 -translate-x-2/4  -translate-y-2/4 cursor-pointer `}
											/>
										</div>
										<label
											htmlFor={subtask.title}
											className={`w-full h-full text-1.2 py-1.2  font-bold ${
												subtask.isCompleted === true && 'opacity-50 line-through'
											} dark:text-white cursor-pointer`}
										>
											{subtask.title}
										</label>
									</li>
								)
							})}
						</ul>
					</main>
					<footer className='flex flex-col relative gap-0.8'>
						<label htmlFor='status' className='text-1.2 font-bold text-medium-grey dark:text-white pointer-events-none'>
							Current Status
						</label>
						<select
							id='status'
							className={`appearance-none text-bodyl px-1.6 py-0.8 rounded-0.4 border border-solid border-white-border bg-white text-black dark:text-white  dark:bg-dark-grey cursor-pointer lg:hover:border-purple lg:focus:border-purple lg:focus:outline lg:focus:outline-0  lg:transition-color lg:duration-300`}
							onChange={handlerChangeStatus}
						>
							<option key={taskStatus} value={taskStatus} className=' bg-white  dark:bg-v-dark-grey text-medium-grey '>
								{taskStatus}
							</option>
							{status.map(option => {
								if (option !== taskStatus) {
									return (
										<option key={option} value={option} className='bg-white  dark:bg-v-dark-grey text-medium-grey'>
											{option}
										</option>
									)
								}
							})}
						</select>
						<img src={downArrow} alt='' className='absolute bottom-1.8 right-1.6 h-[0.47rem] w-[0.94rem]' />
					</footer>
				</div>
			</Modal>
			{showPanel.editTask && (
				<EditTask
					open={showPanel.editTask}
					task={task}
					onClose={handlerHideEditTask}
					closeTask={onClose}
					status={taskStatus}
				/>
			)}
			<DeleteInformation
				open={showDeleteInfo}
				onClose={handlerHideDeleteInformation}
				deletedElement={`${task.title} task`}
				deletedInformation={`Are you sure you want to delete the ‘${task.title}’ task and its subtasks? This action cannot be reversed.`}
				onDelete={handlerDeleteTask}
			/>
		</>
	)
}
