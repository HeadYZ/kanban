import Header from './components/Header.jsx'
import Tasks from './components/Tasks/Tasks.jsx'
import { useState } from 'react'
import Nav from './components/Nav/Nav.jsx'
import { KanbanContextProvider } from './store/KanbanContex.jsx'
import { VisualContextProvider } from './store/VisualContext.jsx'

function App() {
	const [showNav, setShowNav] = useState(false)

	function handlerToggleShowMobileNav() {
		setShowNav(prevShowNav => !prevShowNav)
	}

	return (
		<VisualContextProvider>
			<KanbanContextProvider>
				<Header handlerToggleShowMobileNav={handlerToggleShowMobileNav} />
				<div className='flex relative'>
					<Nav showNav={showNav} onClose={handlerToggleShowMobileNav} />
					<Tasks />
				</div>
			</KanbanContextProvider>
		</VisualContextProvider>
	)
}

export default App
