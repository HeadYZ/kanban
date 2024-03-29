import { useContext, useState } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'
import Button from '../UI/Button.jsx'
import iconShowSidebar from '../../assets/icon-show-sidebar.svg'
import VisualContext from '../../store/VisualContext.jsx'
import Task from './Task.jsx'
import AddNewColumn from './AddNewColumn.jsx'
import NewColumn from './NewColumn.jsx'

export default function TaskList({ className }) {
	const { findCurrentBoard } = useContext(KanbanContex)
	const visualCtx = useContext(VisualContext)

	const [taskInfo, setTaskInfo] = useState({ showTask: false, task: null, status: null })
	const [addNewColumn, setAddNewColumn] = useState(false)
	const currentBoard = findCurrentBoard()
	const handlerShowAddNewColumns = () => {
		setAddNewColumn(true)
	}
	const handlerHideAddNewColumns = () => {
		setAddNewColumn(false)
	}

	const handlerShowTask = (task, status) => {
		setTaskInfo({ showTask: true, task, status })
	}
	const handlerCloseTask = () => {
		setTaskInfo({ showTask: false, task: null, status: null })
	}

	if (currentBoard?.columns.length === 0) {
		return (
			<NewColumn
				showSidebar={visualCtx.showSidebar}
				toggleSidebar={visualCtx.handlerToggleSidebar}
				currentBoard={currentBoard}
			/>
		)
	}

	if (currentBoard?.columns.length > 0) {
		return (
			<>
				<main className={className}>
					<div className='flex px-1.6 gap-x-2.4 py-2.4 snap-x overflow-auto min-h-calchs tablet:min-h-calcshm lg:min-h-calcshl  tablet:border-t tablet:border-lines-light dark:tablet:border-lines-dark'>
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
												className=' mb-2  drop-shadow-md  bg-white dark:bg-dark-grey rounded-0.8 lg:hover:scale-95 lg:transition-transform lg:duration-300'
											>
												<Button
													className='px-1.6 w-full py-2.3 text-left text-black lg:hover:text-purple dark:text-white  lg:dark:hover:text-purple'
													onClick={() => {
														handlerShowTask(task, board.name)
													}}
												>
													<p className='text-hm transition-color duration-300'>{task.title}</p>
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
						<div className='min-w-28  max-w-28 mt-3.94  bg-[rgb(233,239,250)] dark:bg-dark-grey-opacity'>
							<Button
								className={`w-full h-full text-hxl text-medium-grey  lg:hover:text-purple  lg:hover:scale-95 lg:transition lg:duration-300 rounded-0.6 `}
								onClick={handlerShowAddNewColumns}
							>
								+ New Column
							</Button>
						</div>
						<div
							className={`fixed bottom-3.2  ${
								visualCtx.showSidebar ? 'left-0 opacity-100 delay-300' : 'left-minus5.6 opacity-0 '
							} transition-all`}
						>
							<Button
								className={`flex  items-center justify-center   w-5.6 h-4.8 bg-purple rounded-r-full lg:hover:bg-purple-hover lg:duration-300   `}
								onClick={visualCtx.handlerToggleSidebar}
							>
								<img src={iconShowSidebar} alt='' />
							</Button>
						</div>
					</div>
				</main>

				{taskInfo.showTask && (
					<Task
						open={taskInfo.showTask}
						task={taskInfo.task}
						status={taskInfo.status}
						onClose={handlerCloseTask}
						currentBoard={currentBoard}
					/>
				)}
				{addNewColumn && (
					<AddNewColumn open={addNewColumn} onClose={handlerHideAddNewColumns} currentBoard={currentBoard} />
				)}
			</>
		)
	}
}
