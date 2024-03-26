import { useContext, useEffect, useState } from 'react'
import sunIcon from '../../assets/icon-light-theme.svg'
import moonIcon from '../../assets/icon-dark-theme.svg'
import IconBoard from '../../assets/IconBoard.jsx'
import Button from '../UI/Button.jsx'
import KanbanContex from '../../store/KanbanContex.jsx'
import NavItem from './NavItem.jsx'
import VisualContext from '../../store/VisualContext.jsx'
import AddNewBoard from '../Board/AddNewBoard.jsx'
import IconHideSidebar from '../../assets/IconHideSidebar.jsx'

const Nav = () => {
	const { boards, addBoard, selectBoard, activeBoard } = useContext(KanbanContex)
	const visualCtx = useContext(VisualContext)
	const [showModal, setShowModal] = useState(false)
	const body = document.querySelector('body')
	visualCtx.showNav ? body.classList.add('overflow-hidden') : body.classList.remove('overflow-hidden')
	const handlerShowModal = () => {
		setShowModal(prevShow => !prevShow)
	}
	const handlerCreateNewBoard = newBoard => {
		addBoard(newBoard)
	}
	const handlerSelectBoard = selectedBoard => {
		selectBoard(selectedBoard)
	}
	const handlerCloseMobileNav = e => {
		if (e.target.classList.contains('nav-backdrop')) {
			visualCtx.handlerToggleShowMobileNav()
			window.removeEventListener('click', handlerCloseMobileNav)
			return
		}
		if (e.target.closest('li')) {
			window.removeEventListener('click', handlerCloseMobileNav)
		}
	}
	useEffect(() => {
		visualCtx.showNav &&
			setTimeout(() => {
				visualCtx.showNav && window.addEventListener('click', handlerCloseMobileNav)
			}, 10)
	}, [visualCtx.showNav])

	return (
		<>
			<nav
				className={`${
					visualCtx.showNav ? 'z-20 ' : 'opacity-0 z-20 pointer-events-none'
				} absolute top-1.6 left-1/2  max-[640px]:translate-x-minus50 w-26.4 rounded-0.8 bg-white dark:bg-dark-grey   tablet:left-0 tablet:top-0 tablet:relative  tablet:w-26.1 tablet:min-w-26.1 tablet:flex tablet:flex-col tablet:justify-between  tablet:h-full tablet:rounded-none tablet:z-20 tablet:border-r tablet:border-lines-light dark:tablet:border-lines-dark  lg:w-30 lg:min-w-30 tablet:transition-transform transition-opacity duration-500  ${
					visualCtx.showSidebar
						? 'tablet:-translate-x-26.1 lg:-translate-x-30 '
						: 'tablet:translate-x-0 tablet:delay-300'
				} tablet:opacity-100 tablet:pointer-events-auto `}
			>
				<main className='pt-1.6 tablet:pt-3.2'>
					<h2 className='text-1.2 pl-2.4 font-bold tracking-tight text-medium-grey uppercase lg:pl-3.2'>
						All boards ({boards.length})
					</h2>
					<ul className='pt-1.9'>
						<NavItem
							boards={boards}
							onClose={visualCtx.handlerToggleShowMobileNav}
							onSelectBoard={handlerSelectBoard}
							activeBoard={activeBoard}
						/>
						<li
							className='  w-24 h-4.8 group  text-purple lg:w-27.6  lg:gap-x-1.6 lg:rounded-r-right-corners lg:hover:text-purple lg:hover:bg-purple-btn lg:dark:hover:bg-white lg:transition-color lg:duration-300'
							onClick={() => {
								handlerShowModal(), visualCtx.handlerToggleShowMobileNav()
							}}
						>
							<Button className='flex items-center gap-x-1.2 text-hm w-full h-full pl-2.4 lg:pl-3.2'>
								<IconBoard fill='rgb(99,95,199)' /> + Create New Board
							</Button>
						</li>
					</ul>
				</main>
				<footer>
					<div className='flex items-center justify-center gap-2.4 w-23.5 h-4.8 my-1.6 mx-auto rounded-0.6 bg-light-grey dark:bg-v-dark-grey lg:w-25.1'>
						<img src={sunIcon} alt='' />
						<Button
							className='w-4 h-2 rounded-1.2 bg-purple lg:hover:bg-purple-hover lg:transition ease-out lg:duration-300'
							onClick={visualCtx.toggleTheme}
						>
							<div
								className={`w-1.4 h-1.4 ml-0.5 bg-white rounded-full transition-all ${
									visualCtx.theme === 'light' ? 'ml-0.5' : 'ml-2.3'
								} `}
							></div>
						</Button>
						<img src={moonIcon} alt='' />
					</div>
					<Button
						className='hidden group tablet:flex tablet:gap-1 justify-center items-center text-hm pl-2.4 h-4.8 mb-3.2 text-medium-grey  lg:pl-3.2 tablet:w-24 lg:w-27.6 tablet:justify-start lg:rounded-r-right-corners lg:hover:text-purple lg:hover:bg-purple-btn lg:dark:hover:bg-white lg:transition-color lg:duration-300'
						onClick={visualCtx.handlerToggleSidebar}
					>
						<IconHideSidebar />
						Hide Sidebar
					</Button>
				</footer>
			</nav>
			<div
				className={`${
					visualCtx.showNav ? 'opacity-50 z-10' : 'opacity-0 z-10 pointer-events-none'
				} absolute  top-0 left-0 bottom-0 right-0 h-full w-full bg-black transition-opacity duration-500 tablet:hidden tablet:-z-10 nav-backdrop `}
			></div>
			{showModal && (
				<AddNewBoard
					open={showModal}
					onClose={handlerShowModal}
					boards={boards}
					onAddBoard={handlerCreateNewBoard}
				></AddNewBoard>
			)}
		</>
	)
}

export default Nav
