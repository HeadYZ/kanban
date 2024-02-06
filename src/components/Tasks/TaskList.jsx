import { useContext } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'
import Button from '../UI/Button.jsx'

export default function TaskList() {
	const { boards, activeBoard: selectedBoard } = useContext(KanbanContex)
	const currentBoard = boards.find(board => board.name === selectedBoard)

	if (currentBoard) {
		return (
			<section className='flex px-1.6 gap-x-2.4 py-2.4 overflow-x-auto'>
				{currentBoard.columns.map((board, id) => {
					let color
					if (id === 0) color = 'bg-blue'
					if (id === 1) color = 'bg-light-purple'
					if (id === 2) color = 'bg-green'
					if (id > 2) color = 'bg-yellow'
					return (
						<ul key={board.name} className='min-w-28 '>
							<li className='flex mb-2.4 text-hs text-medium-grey uppercase'>
								<div className={`w-1.5 h-1.5 ${color} rounded-full mr-1.2`}></div> {board.name} (
								{board.tasks?.length ?? '0'})
							</li>
							{board.tasks?.map(task => {
								return (
									<li key={task.title} className=' mb-2  drop-shadow-md  bg-white dark:bg-dark-grey rounded-0.8 '>
										<Button className='px-1.6 py-2.3 text-left'>
											<p className='text-hm text-black dark:text-white'>{task.title}</p>
											<span className='text-bodym text-medium-grey'>0 of {task.subtasks.length} subtasks</span>
										</Button>
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
