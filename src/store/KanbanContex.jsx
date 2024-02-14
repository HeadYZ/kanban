import { createContext, useEffect, useReducer } from 'react'

const KanbanContex = createContext({
	boards: [],
	activeBoard: '',
	fetchBoards: () => {},
	selectBoard: () => {},
	editSubtask: () => {},
})

const kanbanBoardsReducer = (state, action) => {
	if (action.type === 'FETCH_BOARDS') {
		return { ...state, boards: action.boards }
	}
	if (action.type === 'SET_ACTIVE_BOARD') {
		return { ...state, activeBoard: action.activeBoard }
	}
	if (action.type === 'SELECT_BOARD') {
		return { ...state, activeBoard: action.activeBoard }
	}
	if (action.type === 'EDIT_SUBTASK') {
		const boardClone = [...state.boards]
		const editedBoardIndex = boardClone.findIndex(board => board.name === action.subtask.board)

		const editedColumn = boardClone[editedBoardIndex].columns.find(task => {
			return task.tasks.find(subtask => {
				return subtask.subtasks.find(title => title.title === action.subtask.id)
			})
		})
		const editedColumnIndex = boardClone[editedBoardIndex].columns.findIndex(
			column => column.name === editedColumn.name
		)
		const editedTaskIndex = boardClone[editedBoardIndex].columns[editedColumnIndex].tasks.findIndex(
			task => task.title === action.subtask.task
		)

		const editedSubtasks = editedColumn.tasks.map(task => {
			return task.subtasks.map(subtask => {
				let changeChecked = subtask
				if (subtask.title === action.subtask.id) {
					let isCompleted = changeChecked.isCompleted
					return { isCompleted: !isCompleted, title: subtask.title }
				}
				return subtask
			})
		})

		boardClone[editedBoardIndex].columns[editedColumnIndex].tasks[editedTaskIndex].subtasks = [
			...editedSubtasks[editedTaskIndex],
		]
		console.log(boardClone[editedBoardIndex].columns[editedColumnIndex].tasks[editedTaskIndex].subtasks)
		return { ...state, boards: boardClone }
	}

	return state
}

export function KanbanContextProvider({ children }) {
	const [kanbanBoards, dispatchKanbanBoards] = useReducer(kanbanBoardsReducer, { boards: [] })

	function fetchBoards(data) {
		dispatchKanbanBoards({ type: 'FETCH_BOARDS', boards: data })
	}
	function setActiveBoard() {
		dispatchKanbanBoards({ type: 'SET_ACTIVE_BOARD', activeBoard: kanbanBoards.boards[0].name })
	}
	function selectBoard(boardName) {
		dispatchKanbanBoards({ type: 'SELECT_BOARD', activeBoard: boardName })
	}

	function editSubtask({ id, task, board }) {
		dispatchKanbanBoards({ type: 'EDIT_SUBTASK', subtask: { id, task, board } })
	}
	function handlerAddBoard(){
		
	}

	useEffect(() => {
		if (kanbanBoards.boards.length > 0) {
			setActiveBoard()
		}
	}, [kanbanBoards.boards])
	const kanban = {
		boards: kanbanBoards.boards,
		activeBoard: kanbanBoards.activeBoard,
		selectBoard,
		fetchBoards,
		editSubtask,
	}

	return <KanbanContex.Provider value={kanban}>{children}</KanbanContex.Provider>
}

export default KanbanContex
