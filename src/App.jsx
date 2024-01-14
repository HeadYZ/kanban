import { useState } from 'react'
import Board from './components/Board'
import TopBar from './components/TopBar'

const toggleTheme = () => {
	if (document.body.classList.contains('dark')) {
		document.body.classList.remove('dark')
		document.body.style.backgroundColor = 'rgb(244, 247, 253)'
	} else {
		document.body.classList.add('dark')
		document.body.style.backgroundColor = 'rgb(32,33,44)'
	}
}

function App() {
	const [showBoardsMenu, setShowBoardsMenu] = useState(false)
	const showBoardsMenuhandler = () => {
		setShowBoardsMenu(current => !current)
		setTimeout(() => {
			setShowBoardsMenu(current => !current)
		}, 500)
	}

	return (
		<>
			<TopBar showBoardsMenu={showBoardsMenuhandler} />
			<button onClick={toggleTheme} className='bg-black w-2 h-2'></button>
			<Board showNav={showBoardsMenu} />
		</>
	)
}

export default App
