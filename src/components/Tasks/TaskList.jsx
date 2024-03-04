import { useContext, useState } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'
import Button from '../UI/Button.jsx'
import iconShowSidebar from '../../assets/icon-show-sidebar.svg'
import VisualContext from '../../store/VisualContext.jsx'
import Task from './Task.jsx'
import AddNewColumn from './AddNewColumn.jsx'

export default function TaskList({ className }) {
	const { boards, activeBoard: selectedBoard } = useContext(KanbanContex)
	const visualCtx = useContext(VisualContext)

	const [taskInfo, setTaskInfo] = useState({ showTask: false, task: null })
	const [addNewColumn, setAddNewColumn] = useState(false)
	const currentBoard = boards.find(board => board.name === selectedBoard)

	console.log('task list')
	const handlerShowAddNewColumns = () => {
		setAddNewColumn(true)
	}
	const handlerHideAddNewColumns = () => {
		setAddNewColumn(false)
	}

	const handlerShowTask = task => {
		setTaskInfo({ showTask: true, task })
	}
	const handlerCloseTask = () => {
		setTaskInfo({ showTask: false, task: null })
	}

	if (currentBoard) {
		return (
			<>
				<main
					className={`flex px-1.6 gap-x-2.4 py-2.4 snap-x overflow-y-auto lg:overflow-x-hidden tablet:h-full  ${className}`}
				>
					{currentBoard.columns.map((board, id) => {
						let noTasks = true
						if (!board.tasks) noTasks = true
						if (board.tasks?.length > 0) noTasks = false

						let color
						if (id === 0) color = 'bg-blue'
						if (id === 1) color = 'bg-light-purple'
						if (id === 2) color = 'bg-green'
						if (id > 2) color = 'bg-yellow'
						return (
							<ul key={board.name} className={`${noTasks ? 'w-13' : 'min-w-28  max-w-28'}`}>
								<li className='flex mb-2.4 text-hs text-medium-grey uppercase '>
									<div className={`w-1.5 h-1.5 ${color} rounded-full mr-1.2`}></div> {board.name} (
									{board.tasks?.length ?? '0'})
								</li>
								{board.tasks?.map(task => {
									let completedSubtasks = 0
									task.subtasks.forEach(subtask => {
										if (subtask.isCompleted === true) completedSubtasks++
									})

									return (
										<li
											key={task.title}
											className=' mb-2  drop-shadow-md  bg-white dark:bg-dark-grey rounded-0.8 hover:scale-95 transition-transform'
										>
											<Button
												className='px-1.6 w-full py-2.3 text-left'
												onClick={() => {
													handlerShowTask(task)
												}}
											>
												<p className='text-hm text-black dark:text-white'>{task.title}</p>
												<span className='text-bodym text-medium-grey'>
													{completedSubtasks} of {task.subtasks.length} subtasks
												</span>
											</Button>
										</li>
									)
								})}
							</ul>
						)
					})}
					<Button
						className={`min-w-28  max-w-28 mt-3.94 text-hxl text-medium-grey bg-[rgb(233,239,250)] dark:bg-dark-grey-opacity  hover:scale-95 transition-transform rounded-0.6 `}
						onClick={handlerShowAddNewColumns}
					>
						+ New Column
					</Button>
					<Button
						className={`flex ${
							visualCtx.showSidebar ? 'left-0 opacity-100 delay-300' : 'left-minus5.6 opacity-0 '
						} items-center justify-center fixed bottom-3.2   w-5.6 h-4.8 bg-purple rounded-r-full opacity-0  transition-all `}
						onClick={visualCtx.handlerToggleSidebar}
					>
						<img src={iconShowSidebar} alt='' />
					</Button>
				</main>

				{taskInfo.showTask && (
					<Task open={taskInfo.showTask} task={taskInfo.task} onClose={handlerCloseTask} currentBoard={currentBoard} />
				)}
				{addNewColumn && <AddNewColumn open={addNewColumn} onClose={handlerHideAddNewColumns} />}
			</>
		)
	}
}
