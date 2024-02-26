import { createContext, useEffect, useReducer } from 'react'

const KanbanContex = createContext({
	boards: [],
	activeBoard: '',
	fetchBoards: () => {},
	selectBoard: () => {},
	editSubtask: () => {},
	addBoard: () => {},
	editBoard: () => {},
	deleteBoard: () => {},
	addTask: () => {},
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
		return { ...state, boards: boardClone }
	}
	if (action.type === 'ADD_BOARD') {
		const prevBoard = [...state.boards]
		prevBoard.push(action.board)
		return { ...state, boards: prevBoard }
	}
	if (action.type === 'EDIT_BOARD') {
		const prevBoard = [...state.boards]

		const indexOfEditedBoard = prevBoard.findIndex(board => board.name === action.editedBoard)
		prevBoard[indexOfEditedBoard] = action.board
		return { ...state, boards: prevBoard }
	}
	if (action.type === 'DELETE_BOARD') {
		const prevBoard = [...state.boards]
		const indexOfDeletedBoard = prevBoard.findIndex(board => board.name === action.deletedBoard)
		prevBoard.splice(indexOfDeletedBoard, 1)
		return { ...state, boards: prevBoard }
	}
	if (action.type === 'ADD_TASK') {
		const prevBoards = [...state.boards]
		const indexOfEditedBoard = prevBoards.findIndex(board => board.name === state.activeBoard)
		const indexOfEditedStatus = prevBoards[indexOfEditedBoard].columns.findIndex(
			status => status.name === action.task.status
		)
		prevBoards[indexOfEditedBoard].columns[indexOfEditedStatus].tasks.push(action.task)
		console.log(prevBoards)
		return { ...state, boards: prevBoards }
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
	function addBoard(board) {
		dispatchKanbanBoards({ type: 'ADD_BOARD', board: board })
	}
	function editBoard(board, activeBoard) {
		dispatchKanbanBoards({ type: 'EDIT_BOARD', board: board, editedBoard: activeBoard })
	}
	function deleteBoard(activeBoard) {
		dispatchKanbanBoards({ type: 'DELETE_BOARD', deletedBoard: activeBoard })
	}
	function addTask(task) {
		dispatchKanbanBoards({ type: 'ADD_TASK', task })
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
		addBoard,
		editBoard,
		deleteBoard,
		addTask,
	}

	return <KanbanContex.Provider value={kanban}>{children}</KanbanContex.Provider>
}

export default KanbanContex
