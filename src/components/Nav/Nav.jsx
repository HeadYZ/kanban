import { useContext, useRef } from 'react'
import sunIcon from '../../assets/icon-light-theme.svg'
import moonIcon from '../../assets/icon-dark-theme.svg'
import IconBoard from '../../assets/IconBoard.jsx'
import Button from '../UI/Button.jsx'
import Modal from '../UI/Modal.jsx'
import KanbanContex from '../../store/KanbanContex.jsx'
import iconHideSidebar from '../../assets/icon-hide-sidebar.svg'
import NavItem from './NavItem.jsx'
import VisualContext from '../../store/VisualContext.jsx'

const Nav = ({ mobileNav, onClose }) => {
	const kanbanCtx = useContext(KanbanContex)
	const visualCtx = useContext(VisualContext)
	const boardRef = useRef()

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
				visualCtx.showSidebar ? 'tablet:translate-x-26.1 lg:translate-x-30 ' : 'translate-x-0 delay-300'
			} `}
		>
			<main className='pt-1.6 tablet:pt-3.2'>
				<h2 className='text-1.2 pl-2.4 font-bold tracking-tight text-medium-grey uppercase lg:pl-3.2'>
					All boards ({kanbanCtx.boards.length})
				</h2>
				<ul className='pt-1.9'>
					<NavItem boards={kanbanCtx.boards} />
					<li className='flex items-center gap-x-1.2  w-24 h-4.8 pl-2.4 text-purple lg:w-27.6 lg:pl-3.2 lg:gap-x-1.6'>
						<IconBoard></IconBoard>
						<Button className='text-hm'>+ Create New Board</Button>
					</li>
				</ul>
			</main>
			<footer>
				<div className='flex items-center justify-center gap-2.4 w-23.5 h-4.8 my-1.6 mx-auto rounded-0.6 bg-light-grey dark:bg-v-dark-grey lg:w-25.1'>
					<img src={sunIcon} alt='' />
					<Button className='w-4 h-2 rounded-1.2 bg-purple' onClick={visualCtx.toggleTheme}>
						<div
							className={`w-1.4 h-1.4 ml-0.5 bg-white rounded-full transition-all ${
								visualCtx.theme === 'light' ? 'ml-0.5' : 'ml-2.3'
							} `}
						></div>
					</Button>
					<img src={moonIcon} alt='' />
				</div>
				<Button
					className='hidden tablet:flex justify-center items-center text-hm pl-2.4 h-4.8 mb-3.2 text-medium-grey lg:pl-3.2'
					onClick={visualCtx.handlerToggleSidebar}
				>
					<img src={iconHideSidebar} alt='' className='pr-1' /> Hide Sidebar
				</Button>
			</footer>
		</nav>
	)

	return visualCtx.smallScreen ? (
		<Modal ref={boardRef} className='mt-8 mx-auto rounded-0.8 bg-white dark:bg-dark-grey'>
			{body}
		</Modal>
	) : (
		body
	)
}

export default Nav
