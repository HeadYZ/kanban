import Button from './UI/Button.jsx'
import useHttp from '../hooks/useHttp.jsx'
import Spinner from './UI/Spinner.jsx'
import { useContext, useEffect } from 'react'
import KanbanContex from '../store/KanbanContex.jsx'

const Tasks = ({ showSidebar }) => {
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
					showSidebar ? 'translate-x-30 lg:min-w-wcalc' : 'translate-x-0'
				}  lg:min-h-calcshl`}
			>
				<p className='text-hl text-medium-grey sm:pr-2.4'>This board is empty. Create a new column to get started.</p>
				<Button className='flex items-center justify-center w-17.4 h-4.8 bg-purple rounded-2.4 text-hm text-white'>
					+ Add New Column
				</Button>
			</main>
		)
	}

	return <div className='sm:col-start-2 sm:row-start-2 sm:row-end-3 '>cos</div>
}

export default Tasks
