import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'
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
			<div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2'>
				<Header showMobileNavHandler={handleShowMobileNav} />
				<Nav mobileNav={showNav} onClose={handleCloseMobileNav} />
				<Tasks />
			</div>
		</KanbanContextProvider>
	)
}

export default App
