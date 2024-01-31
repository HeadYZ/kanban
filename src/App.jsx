import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'
import { useState } from 'react'
import Nav from './components/Nav.jsx'
import { KanbanContextProvider } from './store/KanbanContex.jsx'

function App() {
	const smallScreen = window.innerWidth < 660
	const [showNav, setShowNav] = useState(false)

	function handleShowMobileNav() {
		setShowNav(true)
	}

	function handleCloseMobileNav() {
		setShowNav(false)
	}

	return (
		<KanbanContextProvider>
			<div className='grid grid-cols-1 tablet:grid-cols-2 tablet:grid-rows-2'>
				<Header showMobileNavHandler={handleShowMobileNav} smallScreen={smallScreen} />
				<Nav mobileNav={showNav} onClose={handleCloseMobileNav} smallScreen={smallScreen} />
				<Tasks />
			</div>
		</KanbanContextProvider>
	)
}

export default App
