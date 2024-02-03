import Header from './components/Header.jsx'
import Tasks from './components/Tasks/Tasks.jsx'
import { useState } from 'react'
import Nav from './components/Nav/Nav.jsx'
import { KanbanContextProvider } from './store/KanbanContex.jsx'
import { VisualContextProvider } from './store/VisualContext.jsx'

function App() {
	const [showNav, setShowNav] = useState(false)

	function handleShowMobileNav() {
		setShowNav(true)
	}

	function handleCloseMobileNav() {
		setShowNav(false)
	}

	return (
		<VisualContextProvider>
			<KanbanContextProvider>
				<Header showMobileNavHandler={handleShowMobileNav} />
				<div className='flex'>
					<Nav mobileNav={showNav} onClose={handleCloseMobileNav} />
					<Tasks />
				</div>
			</KanbanContextProvider>
		</VisualContextProvider>
	)
}

export default App
