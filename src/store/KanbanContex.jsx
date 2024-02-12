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
		const indexEditedBoard = state.boards.findIndex(editedBoard => {
			return editedBoard.name === action.subtask.board
		})
		const indexEditedStatus = state.boards[indexEditedBoard].columns.findIndex(
			status => status.name === action.subtask.task.status
		)
		const indexEditedTask = state.boards[indexEditedBoard].columns[indexEditedStatus].tasks.findIndex(
			editedTask => editedTask.title === action.subtask.task.title
		)

		const indexEditetSubtask = state.boards[indexEditedBoard].columns[indexEditedStatus].tasks[
			indexEditedTask
		].subtasks.findIndex(subtasks => subtasks.title === action.subtask.id)
		const subtasks = state.boards[indexEditedBoard].columns[indexEditedStatus].tasks[indexEditedTask].subtasks

		if (subtasks[indexEditetSubtask].isCompleted === true) {
			subtasks[indexEditetSubtask].isCompleted = false
		} else {
			subtasks[indexEditetSubtask].isCompleted = true
		}
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
		console.log(board)
		dispatchKanbanBoards({ type: 'EDIT_SUBTASK', subtask: { id, task, board } })
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
