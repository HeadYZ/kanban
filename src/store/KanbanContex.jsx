import { createContext, useEffect, useReducer } from 'react'

const KanbanContex = createContext({
	boards: [],
	activeBoard: '',
	fetchBoards: () => {},
	selectBoard: () => {},
	editSubtask: () => {},
	changeTaskStatus: () => {},
	addBoard: () => {},
	editBoard: () => {},
	deleteBoard: () => {},
	addTask: () => {},
	addNewColumn: () => {},
	editTask: () => {},
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
		const prevBoard = [...state.boards]
		const indexOfBoard = prevBoard.findIndex(board => board.name === action.subtask.board)
		const indexOfStatus = prevBoard[indexOfBoard].columns.findIndex(col => col.name === action.subtask.status)
		const indexOfTask = prevBoard[indexOfBoard].columns[indexOfStatus].tasks.findIndex(
			task => task.title === action.subtask.taskTitle
		)
		prevBoard[indexOfBoard].columns[indexOfStatus].tasks[indexOfTask].subtasks = action.subtask.subtasks
		return { ...state, boards: prevBoard }
	}
	if (action.type === 'CHANGE_TASK_STATUS') {
		const prevBoard = [...state.boards]
		const indexOfBoard = prevBoard.findIndex(board => board.name === action.task.board)
		const indexOfOldStatus = prevBoard[indexOfBoard].columns.findIndex(col => col.name === action.task.oldStatus)
		const indexOfNewStatus = prevBoard[indexOfBoard].columns.findIndex(col => col.name === action.task.newStatus)

		const indexOfTask = prevBoard[indexOfBoard].columns[indexOfOldStatus].tasks?.findIndex(
			task => task.title === action.task.taskTitle
		)
		const task = { ...prevBoard[indexOfBoard].columns[indexOfOldStatus].tasks[indexOfTask] }
		task.status = action.task.newStatus
		if (task.title) {
			prevBoard[indexOfBoard].columns[indexOfOldStatus].tasks.splice(indexOfTask, 1)
			if (prevBoard[indexOfBoard].columns[indexOfNewStatus].tasks) {
				prevBoard[indexOfBoard].columns[indexOfNewStatus].tasks.push(task)
			} else {
				prevBoard[indexOfBoard].columns[indexOfNewStatus].tasks = []
				prevBoard[indexOfBoard].columns[indexOfNewStatus].tasks.push(task)
			}
		}
		return { ...state, board: prevBoard }
	}
	if (action.type === 'ADD_BOARD') {
		const prevBoard = [...state.boards]
		prevBoard.push(action.board)
		console.log(action.board)
		return { ...state, boards: prevBoard, activeBoard: action.board.name }
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
		const noTasksInBoard = prevBoards[indexOfEditedBoard].columns[indexOfEditedStatus].tasks

		if (!noTasksInBoard) {
			prevBoards[indexOfEditedBoard].columns[indexOfEditedStatus].tasks = []
		}
		const checkIfTaskExisted = prevBoards[indexOfEditedBoard].columns[indexOfEditedStatus].tasks.some(
			task => task.title === action.task.title
		)

		if (!checkIfTaskExisted) {
			prevBoards[indexOfEditedBoard].columns[indexOfEditedStatus].tasks.push(action.task)
		}

		return { ...state, boards: prevBoards }
	}
	if (action.type === 'ADD_NEW_COLUMN') {
		const prevBoard = [...state.boards]
		const indexOfEditedBoard = prevBoard.findIndex(board => board.name === state.activeBoard)
		let colNameExisted = false

		prevBoard[indexOfEditedBoard].columns.forEach(col => {
			action.columns.forEach(actionCol => {
				if (actionCol.name === col.name) colNameExisted = true
			})
		})

		if (!colNameExisted) {
			prevBoard[indexOfEditedBoard].columns.push(...action.columns)
		}

		return { ...state, boards: prevBoard }
	}
	if (action.type === 'EDIT_TASK') {
		const prevBoard = [...state.boards]
		const indexOfEditedBoard = prevBoard.findIndex(
			board => board.name.toLowerCase() === state.activeBoard.toLowerCase()
		)
		const indexOfEditedColumn = prevBoard[indexOfEditedBoard].columns.findIndex(
			column => column.name.toLowerCase() === action.statusEditTask.toLowerCase()
		)
		const indexOfEditedTask = prevBoard[indexOfEditedBoard].columns[indexOfEditedColumn].tasks.findIndex(
			task => task.title.toLowerCase() === action.titleEditTask.toLowerCase()
		)
		prevBoard[indexOfEditedBoard].columns[indexOfEditedColumn].tasks[indexOfEditedTask] = action.task

		return { ...state, boards: prevBoard }
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

	function editSubtask({ subtasks, status, board, taskTitle }) {
		dispatchKanbanBoards({ type: 'EDIT_SUBTASK', subtask: { subtasks, status, board, taskTitle } })
	}
	function changeTaskStatus({ oldStatus, newStatus, board, taskTitle }) {
		dispatchKanbanBoards({ type: 'CHANGE_TASK_STATUS', task: { oldStatus, newStatus, board, taskTitle } })
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
	function addNewColumn(columns) {
		dispatchKanbanBoards({ type: 'ADD_NEW_COLUMN', columns })
	}
	function editTask(task, titleEditTask, statusEditTask) {
		dispatchKanbanBoards({ type: 'EDIT_TASK', task, titleEditTask, statusEditTask })
	}

	useEffect(() => {
		if (kanbanBoards.boards.length > 0 && !kanbanBoards.activeBoard) {
			setActiveBoard()
		}
	}, [kanbanBoards.boards])

	const kanban = {
		boards: kanbanBoards.boards,
		activeBoard: kanbanBoards.activeBoard,
		selectBoard,
		fetchBoards,
		editSubtask,
		changeTaskStatus,
		addBoard,
		editBoard,
		deleteBoard,
		addTask,
		addNewColumn,
		editTask,
	}

	return <KanbanContex.Provider value={kanban}>{children}</KanbanContex.Provider>
}

export default KanbanContex
