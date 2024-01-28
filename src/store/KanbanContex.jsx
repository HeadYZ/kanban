import { createContext } from 'react'

const KanbanContex = createContext({
	boards: [],
})

export function KanbanContexProvider({ children }) {

    

	return <KanbanContex.Provider>{children}</KanbanContex.Provider>
}

export default KanbanContex
