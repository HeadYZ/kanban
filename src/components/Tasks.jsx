import Button from './UI/Button.jsx'
import useHttp from '../hooks/useHttp.jsx'
import Spinner from './UI/Spinner.jsx'
import { useContext, useEffect } from 'react'
import KanbanContex from '../store/KanbanContex.jsx'
import iconShowSidebar from '../assets/icon-show-sidebar.svg'

const Tasks = ({ showSidebar, handlerToggleSidebar }) => {
	const { data: boards, isLoading } = useHttp('https://kanban-f64b7-default-rtdb.firebaseio.com/boards.json', [])
	const kanbanCtx = useContext(KanbanContex)
	useEffect(() => {
		kanbanCtx.fetchBoards(boards)
	}, [boards])

	if (isLoading) {
		return <Spinner />
	}
	if (!isLoading && boards.length > 1) {
		return (
			<main
				className={`flex flex-col justify-center items-center gap-2.5 relative  min-h-calchs w-full pl-1.6 pt-2.4 text-center tablet:pl-2.4 tablet:min-h-calcshm tablet:border-t tablet:border-lines-light dark:tablet:border-lines-dark ${
					showSidebar ? 'tablet:translate-x-26.1 lg:translate-x-30 ' : 'translate-x-0 delay-300  '
				}  lg:min-h-calcshl transition-all`}
			>
				<p className='text-hl text-medium-grey sm:pr-2.4 '>This board is empty. Create a new column to get started.</p>
				<Button className='flex items-center justify-center w-17.4 h-4.8 bg-purple rounded-2.4 text-hm text-white'>
					+ Add New Column
				</Button>
				<Button
					className={`flex ${
						showSidebar ? 'left-0 opacity-100 delay-300' : 'left-minus5.6 opacity-0 '
					} items-center justify-center absolute bottom-3.2   w-5.6 h-4.8 bg-purple rounded-r-full opacity-0  transition-all `}
					onClick={handlerToggleSidebar}
				>
					<img src={iconShowSidebar} alt='' />
				</Button>
			</main>
		)
	}

	return <div className='sm:col-start-2 sm:row-start-2 sm:row-end-3 '>cos</div>
}

export default Tasks
