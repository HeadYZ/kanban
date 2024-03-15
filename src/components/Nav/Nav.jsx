import { useContext, useState } from 'react'
import sunIcon from '../../assets/icon-light-theme.svg'
import moonIcon from '../../assets/icon-dark-theme.svg'
import IconBoard from '../../assets/IconBoard.jsx'
import Button from '../UI/Button.jsx'
import KanbanContex from '../../store/KanbanContex.jsx'
import iconHideSidebar from '../../assets/icon-hide-sidebar.svg'
import NavItem from './NavItem.jsx'
import VisualContext from '../../store/VisualContext.jsx'
import AddNewBoard from '../Board/AddNewBoard.jsx'

const Nav = ({ showNav, onClose }) => {
	const { boards, addBoard, selectBoard, activeBoard } = useContext(KanbanContex)
	const visualCtx = useContext(VisualContext)
	const [showModal, setShowModal] = useState(false)

	const handlerShowModal = () => {
		setShowModal(prevShow => !prevShow)
	}
	const handlerCreateNewBoard = newBoard => {
		addBoard(newBoard)
	}
	const handlerSelectBoard = selectedBoard => {
		selectBoard(selectedBoard)
	}

	return (
		<>
			<nav
				className={`${
					showNav ? 'z-20 ' : 'opacity-0 -z-10'
				} absolute top-1.6 left-1/2  max-[640px]:translate-x-minus50 w-26.4 rounded-0.8 bg-white dark:bg-dark-grey   tablet:left-0 tablet:top-0 tablet:relative  tablet:w-26.1 tablet:min-w-26.1 tablet:flex tablet:flex-col tablet:justify-between  tablet:h-full tablet:rounded-none tablet:z-20 tablet:border-r tablet:border-lines-light dark:tablet:border-lines-dark  lg:w-30 lg:min-w-30 tablet:transition-transform transition-opacity  ${
					visualCtx.showSidebar
						? 'tablet:translate-x-minus26.1 lg:translate-x-minus30 '
						: 'tablet:translate-x-0 tablet:delay-300'
				} tablet:opacity-100 `}
			>
				<main className='pt-1.6 tablet:pt-3.2'>
					<h2 className='text-1.2 pl-2.4 font-bold tracking-tight text-medium-grey uppercase lg:pl-3.2'>
						All boards ({boards.length})
					</h2>
					<ul className='pt-1.9'>
						<NavItem boards={boards} onClose={onClose} onSelectBoard={handlerSelectBoard} activeBoard={activeBoard} />
						<li
							className='flex items-center gap-x-1.2  w-24 h-4.8 pl-2.4 text-purple lg:w-27.6 lg:pl-3.2 lg:gap-x-1.6'
							onClick={handlerShowModal}
						>
							<IconBoard></IconBoard>
							<Button className='text-hm'>+ Create New Board</Button>
						</li>
					</ul>
				</main>
				<footer>
					<div className='flex items-center justify-center gap-2.4 w-23.5 h-4.8 my-1.6 mx-auto rounded-0.6 bg-light-grey dark:bg-v-dark-grey lg:w-25.1'>
						<img src={sunIcon} alt='' />
						<Button
							className='w-4 h-2 rounded-1.2 bg-purple hover:bg-purple-hover transition ease-out duration-300'
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
						className='hidden tablet:flex justify-center items-center text-hm pl-2.4 h-4.8 mb-3.2 text-medium-grey lg:pl-3.2'
						onClick={visualCtx.handlerToggleSidebar}
					>
						<img src={iconHideSidebar} alt='' className='pr-1' /> Hide Sidebar
					</Button>
				</footer>
			</nav>
			<div
				className={`${
					showNav ? 'opacity-50 z-10' : 'opacity-0 -z-10'
				} absolute  top-0 left-0 bottom-0 right-0 h-full w-full bg-black transition-opacity tablet:hidden tablet:-z-10 nav-backdrop`}
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
