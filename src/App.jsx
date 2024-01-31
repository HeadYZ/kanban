import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'
import { useState } from 'react'
import Nav from './components/Nav.jsx'
import { KanbanContextProvider } from './store/KanbanContex.jsx'

function App() {
	const smallScreen = window.innerWidth < 660
	const [showSidebar, setShowSidebar] = useState(false)
	const [showNav, setShowNav] = useState(false)

	function handleShowMobileNav() {
		setShowNav(true)
	}

	function handleCloseMobileNav() {
		setShowNav(false)
	}

	const handlerToggleSidebar = () => {
		setShowSidebar(showSidebar => !showSidebar)
	}
	return (
		<KanbanContextProvider>
			<Header showMobileNavHandler={handleShowMobileNav} smallScreen={smallScreen} />
			<div className='flex'>
				<Nav
					mobileNav={showNav}
					onClose={handleCloseMobileNav}
					smallScreen={smallScreen}
					handlerToggleSidebar={handlerToggleSidebar}
					showSidebar={showSidebar}
				/>
				<Tasks showSidebar={showSidebar} />
			</div>
		</KanbanContextProvider>
	)
}

export default App
