import { useContext, useRef, useState } from 'react'
import sunIcon from '../assets/icon-light-theme.svg'
import moonIcon from '../assets/icon-dark-theme.svg'
import IconBoard from '../assets/IconBoard.jsx'
import Button from './UI/Button.jsx'
import Modal from './UI/Modal.jsx'
import KanbanContex from '../store/KanbanContex.jsx'
import iconHideSidebar from '../assets/icon-hide-sidebar.svg'

const Nav = ({ mobileNav, onClose, smallScreen, handlerToggleSidebar, showSidebar }) => {
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
		<nav
			className={`w-26.4 rounded-0.8 bg-white dark:bg-dark-grey tablet:min-w-26.1 tablet:flex tablet:flex-col tablet:justify-between  tablet:h-calcshm tablet:rounded-none tablet:border-r tablet:border-lines-light dark:tablet:border-lines-dark lg:h-calcshl lg:min-w-30 transition-all ${
				showSidebar ? 'translate-x-30' : 'translate-x-0 delay-300'
			} `}
		>
			<main className='pt-1.6 tablet:pt-3.2'>
				<h2 className='text-1.2 pl-2.4 font-bold tracking-tight text-medium-grey uppercase lg:pl-3.2'>
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
								className={`flex items-center gap-x-1.2 w-24 h-4.8 pl-2.4 lg:pl-3.2 lg:gap-x-1.6 text-medium-grey ${
									activeBoard && activeBoardClass
								} lg:w-27.6`}
							>
								<IconBoard fill={activeBoard && 'white'}></IconBoard>
								<Button className='text-hm '>{board.name}</Button>
							</li>
						)
					})}
					<li className='flex items-center gap-x-1.2  w-24 h-4.8 pl-2.4 text-purple lg:w-27.6 lg:pl-3.2 lg:gap-x-1.6'>
						<IconBoard></IconBoard>
						<Button className='text-hm'>+ Create New Board</Button>
					</li>
				</ul>
			</main>
			<footer>
				<div className='flex items-center justify-center gap-2.4 w-23.5 h-4.8 my-1.6 mx-auto rounded-0.6 bg-light-grey dark:bg-v-dark-grey lg:w-25.1'>
					<img src={sunIcon} alt='' />
					<Button className='w-4 h-2 rounded-1.2 bg-purple' onClick={toggleTheme}>
						<div
							className={`w-1.4 h-1.4 ml-0.5 bg-white rounded-full transition-all ${
								theme === 'light' ? 'ml-0.5' : 'ml-2.3'
							} `}
						></div>
					</Button>
					<img src={moonIcon} alt='' />
				</div>
				<Button
					className='hidden tablet:flex justify-center items-center text-hm pl-2.4 h-4.8 mb-3.2 text-medium-grey lg:pl-3.2'
					onClick={handlerToggleSidebar}
				>
					<img src={iconHideSidebar} alt='' className='pr-1' /> Hide Sidebar
				</Button>
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
