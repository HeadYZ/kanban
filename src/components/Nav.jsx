import { useContext, useRef } from 'react'
import sunIcon from '../assets/icon-light-theme.svg'
import moonIcon from '../assets/icon-dark-theme.svg'
import IconBoard from '../assets/IconBoard.jsx'
import Button from './UI/Button.jsx'
import Modal from './UI/Modal.jsx'
import KanbanContex from '../store/KanbanContex.jsx'

const Nav = ({ mobileNav, onClose }) => {
	const kanbanCtx = useContext(KanbanContex)
	const boardRef = useRef()

	const toggleTheme = () => {
		if (document.body.classList.contains('dark')) {
			document.body.classList.remove('dark')
			document.body.style.backgroundColor = 'rgb(244, 247, 253)'
		} else {
			document.body.classList.add('dark')
			document.body.style.backgroundColor = 'rgb(32,33,44)'
		}
	}

	const hideBoardsMenuHandler = () => {
		window.addEventListener('click', e => {
			if (e.target === boardRef.current) {
				boardRef.current.close()
				onClose()
			}
		})
	}

	mobileNav && boardRef.current.showModal()
	mobileNav && hideBoardsMenuHandler()
	const body = (
		<nav className='w-26.4 rounded-0.8'>
			<header className='pt-1.6'>
				<h2 className='text-1.2 pl-2.4 font-bold tracking-tight text-medium-grey uppercase'>
					All boards ({kanbanCtx.boards.length})
				</h2>
			</header>
			<main>
				<ul className='pt-1.9'>
					{kanbanCtx.boards.map(board => (
						<li
							key={board.name}
							tabIndex={0}
							className='flex items-center gap-x-1.2 w-24 h-4.8 pl-2.4 text-medium-grey'
						>
							<IconBoard></IconBoard>
							<Button className='text-hm'>{board.name}</Button>
						</li>
					))}
					<li className='flex items-center gap-x-1.2  w-24 h-4.8 pl-2.4 text-purple '>
						<IconBoard fill='rgb(99,95,199)'></IconBoard>
						<Button className='text-hm'>+ Create New Board</Button>
					</li>
				</ul>
			</main>
			<footer className='flex items-center justify-center gap-2.4 w-23.5 h-4.8 my-1.6 mx-auto rounded-0.6 bg-light-grey'>
				<img src={sunIcon} alt='' />
				<Button className='w-4 h-2 rounded-1.2 bg-purple' onClick={toggleTheme}>
					<div className='w-1.4 h-1.4 ml-0.5 bg-white rounded-full hover:animate-[lightTheme_1s_forwards]'></div>
				</Button>
				<img src={moonIcon} alt='' />
			</footer>
		</nav>
	)

	return window.screen.width < 600 ? (
		<Modal ref={boardRef} className='mt-8 mx-auto rounded-0.8'>
			{body}
		</Modal>
	) : (
		body
	)
}

export default Nav
