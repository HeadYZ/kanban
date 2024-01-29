import { createContext, useState } from 'react'

const KanbanContex = createContext({
	boards: [],
})

export function KanbanContextProvider({ children }) {
	const [boards, setBoards] = useState([])

	function fetchBoards(data) {
		setBoards(data)
	}

	const kanban = { boards: boards, fetchBoards }

	return <KanbanContex.Provider value={kanban}>{children}</KanbanContex.Provider>
}

export default KanbanContex
