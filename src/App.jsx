import Header from './components/Header.jsx'
import Tasks from './components/Tasks/Tasks.jsx'
import { useContext, useEffect, useState } from 'react'
import Nav from './components/Nav/Nav.jsx'
import useHttp from './hooks/useHttp.jsx'
import KanbanContex from './store/KanbanContex.jsx'

function App() {
	const { data: boards, isLoading } = useHttp('https://kanban-f64b7-default-rtdb.firebaseio.com/boards.json', [])

	const kanbanCtx = useContext(KanbanContex)
	useEffect(() => {
		kanbanCtx.fetchBoards(boards)
	}, [boards])

	const [showNav, setShowNav] = useState(false)

	function handlerToggleShowMobileNav() {
		setShowNav(prevShowNav => !prevShowNav)
	}

	return (
		<>{isLoading && <div className='bg-white flex'><p>Loading</p></div>}
			{!isLoading && <Header handlerToggleShowMobileNav={handlerToggleShowMobileNav} />}
			{!isLoading && (
				<div className='flex relative'>
					<Nav showNav={showNav} onClose={handlerToggleShowMobileNav} />
					<Tasks />
				</div>
			)}
		</>
	)
}

export default App
