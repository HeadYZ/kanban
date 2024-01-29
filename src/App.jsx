import Header from './components/Header.jsx'
import Boards from './components/Boards.jsx'
import { useState } from 'react'
import Nav from './components/Nav.jsx'
import { KanbanContextProvider } from './store/KanbanContex.jsx'

function App() {
	
	const [showNav, setShowNav] = useState(false)

	function handleShowMobileNav() {
		setShowNav(true)
	}

	function handleCloseMobileNav() {
		setShowNav(false)
	}

	return (
		<KanbanContextProvider>
			<Header showMobileNavHandler={handleShowMobileNav} />
			<Nav mobileNav={showNav} onClose={handleCloseMobileNav} />
			<Boards />
		</KanbanContextProvider>
	)
}

export default App
