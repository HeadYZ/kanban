import Button from '../UI/Button.jsx'
import { useContext, useEffect } from 'react'
import KanbanContex from '../../store/KanbanContex.jsx'

import VisualContext from '../../store/VisualContext.jsx'
import TaskList from './TaskList.jsx'
import NewColumn from './NewColumn.jsx'

const Tasks = ({ boards }) => {
	const { boards: kanbanBoards, findCurrentBoard, fetchBoards } = useContext(KanbanContex)
	const visualCtx = useContext(VisualContext)
	let currentBoard
	useEffect(() => {
		fetchBoards(boards)
	}, [])
	if (kanbanBoards.length > 0) currentBoard = findCurrentBoard()

	if (kanbanBoards.length === 0) {
		return (
			<NewColumn
				showSidebar={visualCtx.showSidebar}
				toggleSidebar={visualCtx.handlerToggleSidebar}
				currentBoard={currentBoard}
			/>
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
