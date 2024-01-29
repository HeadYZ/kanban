import { useContext, useRef, useState } from 'react'
import sunIcon from '../assets/icon-light-theme.svg'
import moonIcon from '../assets/icon-dark-theme.svg'
import IconBoard from '../assets/IconBoard.jsx'
import Button from './UI/Button.jsx'
import Modal from './UI/Modal.jsx'
import KanbanContex from '../store/KanbanContex.jsx'
import logoMobile from '../assets/logo-mobile.svg'
const smallScreen = window.screen.width < 600

const Nav = ({ mobileNav, onClose }) => {
	const [theme, setTheme] = useState('light')
	const kanbanCtx = useContext(KanbanContex)
	const boardRef = useRef()

	const toggleTheme = () => {
		if (document.body.classList.contains('dark')) {
			document.body.classList.remove('dark')
			document.body.style.backgroundColor = 'rgb(244, 247, 253)'
			setTheme('light')
		} else {
			document.body.classList.add('dark')
			document.body.style.backgroundColor = 'rgb(32,33,44)'
			setTheme('dark')
		}
	}

	const hideBoardsMenuHandler = e => {
		if (e.target === boardRef.current) {
			boardRef.current.close()
			onClose()
		}
	}

	mobileNav && boardRef.current.showModal()
	mobileNav && window.addEventListener('click', hideBoardsMenuHandler)

	const body = (
		<nav className='w-26.4 rounded-0.8 bg-white dark:bg-dark-grey sm:w-26.1 sm:row-span-full sm:h-svh sm:rounded-none'>
			<main className='pt-1.6 sm:pt-3.2'>
				<div className='hidden sm:flex items-center ml-2.6 '>
					<img src={logoMobile} alt='' className='h-2.5' />
					<h1 className='dark:text-light-grey pl-1.6 text-3 font-extrabold'>kanban</h1>
				</div>
				<h2 className='text-1.2 pl-2.4 pt-5.4 font-bold tracking-tight text-medium-grey uppercase'>
					All boards ({kanbanCtx.boards.length})
				</h2>
				<ul className='pt-1.9'>
					{kanbanCtx.boards.map(board => {
						const activeBoardClass = 'bg-purple rounded-r-full text-white'
						const activeBoard = board.name === 'Platform Launch'

						return (
							<li
								key={board.name}
								tabIndex={0}
								className={`flex items-center gap-x-1.2 w-24 h-4.8 pl-2.4 text-medium-grey ${
									activeBoard && activeBoardClass
								}`}
							>
								<IconBoard fill={activeBoard && 'white'}></IconBoard>
								<Button className='text-hm'>{board.name}</Button>
							</li>
						)
					})}
					<li className='flex items-center gap-x-1.2  w-24 h-4.8 pl-2.4 text-purple '>
						<IconBoard></IconBoard>
						<Button className='text-hm'>+ Create New Board</Button>
					</li>
				</ul>
			</main>
			<footer className='flex items-center justify-center gap-2.4 w-23.5 h-4.8 my-1.6 mx-auto rounded-0.6 bg-light-grey dark:bg-v-dark-grey'>
				<img src={sunIcon} alt='' />
				<Button className='w-4 h-2 rounded-1.2 bg-purple' onClick={toggleTheme}>
					<div
						className={`w-1.4 h-1.4 ml-0.5 bg-white rounded-full transition-all ${
							theme === 'light' ? 'ml-0.5' : 'ml-2.3'
						} `}
					></div>
				</Button>
				<img src={moonIcon} alt='' />
			</footer>
		</nav>
	)

	return smallScreen ? (
		<Modal ref={boardRef} className='mt-8 mx-auto rounded-0.8 bg-white dark:bg-dark-grey'>
			{body}
		</Modal>
	) : (
		body
	)
}

export default Nav
