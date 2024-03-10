import Button from '../UI/Button.jsx'
import { useContext, useEffect } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'
import iconShowSidebar from '../../assets/icon-show-sidebar.svg'
import VisualContext from '../../store/VisualContext.jsx'
import TaskList from './TaskList.jsx'

const Tasks = ({ boards }) => {
	const kanbanCtx = useContext(KanbanContex)
	const visualCtx = useContext(VisualContext)

	useEffect(() => {
		kanbanCtx.fetchBoards(boards)
	}, [])

	if (kanbanCtx.boards.length === 0) {
		return (
			<main
				className={`flex flex-col justify-center items-center gap-2.5 relative w-full min-h-calchs  pl-1.6 pt-2.4 text-center dark:bg-v-dark-grey tablet:pl-2.4 tablet:min-h-calcshm   lg:min-h-calcshl  tablet:border-t tablet:border-lines-light dark:tablet:border-lines-dark ${
					visualCtx.showSidebar
						? 'tablet:translate-x-minus30 min-w-wcalc '
						: 'tablet:translate-x-0 min-w-minw delay-300 '
				}  transition-all`}
			>
				<p className='text-hl text-medium-grey sm:pr-2.4 '>This board is empty. Create a new column to get started.</p>
				<Button className='flex items-center justify-center w-17.4 h-4.8 bg-purple rounded-2.4 text-hm text-white'>
					+ Add New Column
				</Button>
				<Button
					className={`flex ${
						visualCtx.showSidebar ? 'left-0 opacity-100 delay-300' : 'left-minus5.6 opacity-0 '
					} items-center justify-center absolute bottom-3.2   w-5.6 h-4.8 bg-purple rounded-r-full opacity-0  transition-all `}
					onClick={visualCtx.handlerToggleSidebar}
				>
					<img src={iconShowSidebar} alt='' />
				</Button>
			</main>
		)
	}

	return (
		<TaskList
			className={` ${
				visualCtx.showSidebar ? 'tablet:translate-x-minus30 min-w-wcalc ' : 'tablet:translate-x-0 min-w-minw delay-300 '
			}  transition-all	tablet:border-t tablet:border-lines-light dark:tablet:border-lines-dark`}
		/>
	)
}

export default Tasks

// ${
// 	visualCtx.showSidebar ? 'tablet:translate-x-0 ' : 'tablet:translate-x-26.1 lg:translate-x-30  delay-300'
// }  transition-transform
