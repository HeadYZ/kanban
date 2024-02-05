import { useContext } from 'react'
import KanbanContex from '../../store/KanbanContex'

export default function TaskList() {
	const kanbanCtx = useContext(KanbanContex)
	const currentBoard = kanbanCtx.boards.find(board => board.name === kanbanCtx.activeBoard)
	if (currentBoard) {
		return (
			<section className='flex pl-1.6 gap-x-2.4 py-2.4 overflow-hidden'>
				{currentBoard.columns.map(board => {
					return (
						<ul key={board.name} className='min-w-28 '>
							<li className='mb-2.4 text-hs text-medium-grey uppercase'>
								{board.name} ({board.tasks?.length ?? '0'})
							</li>
							{board.tasks?.map(task => {
								return (
									<li
										key={task.title}
										className=' mb-2 px-1.6 py-2.3 drop-shadow-md  bg-white dark:bg-dark-grey rounded-0.8 '
									>
										<p className='text-hm text-black dark:text-white'>{task.title}</p>
										<span className='text-bodym text-medium-grey'>0 of {task.subtasks.length} subtasks</span>
									</li>
								)
							})}
						</ul>
					)
				})}
			</section>
		)
	}
}
