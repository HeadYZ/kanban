import logo from '../assets/logo-mobile.svg'
import downArrow from '../assets/icon-chevron-down.svg'
import plusIcon from '../assets/icon-add-task-mobile.svg'
import iconVertical from '../assets/icon-vertical-ellipsis.svg'
import logoMobile from '../assets/logo-mobile.svg'
import Button from './UI/Button.jsx'
import { useContext } from 'react'
import KanbanContex from '../store/KanbanContex.jsx'

const Header = ({ handlerToggleShowMobileNav, navIsVisible }) => {
	const kanbanCtx = useContext(KanbanContex)
	return (
		<header className='flex h-6.4 px-1.6 bg-white dark:bg-dark-grey  tablet:h-8 tablet:px-2.4  lg:h-9.6 lg:px-3.4 tablet:border-b tablet:border-lines-light dark:tablet:border-lines-dark'>
			<div className='hidden tablet:flex items-center h-full min-w-23.7  lg:min-w-26.6  border-r border-lines-light dark:border-lines-dark '>
				<img src={logoMobile} alt='' className='h-2.5' />
				<h1 className='dark:text-light-grey pl-1.6 text-3 font-extrabold'>kanban</h1>
			</div>
			<div className='flex items-center justify-between w-full tablet:pl-2.4'>
				<div className='flex gap-x-1.6'>
					<img src={logo} alt='' className='w-2.4 h-2.5 tablet:hidden' tabIndex={0} />
					<Button
						className='flex items-center text-hl dark:text-white tablet:text-2 lg:text-hxl'
						onClick={handlerToggleShowMobileNav}
					>
						{kanbanCtx.activeBoard}
						<span className={`px-0.6 ${navIsVisible && 'rotate-180'} transition-transform`}>
							<img src={downArrow} alt='' className='w-0.8 h-0.4 tablet:hidden' />
						</span>
					</Button>
				</div>
				<div className='flex items-center gap-x-1.6'>
					<Button
						className={`flex items-center justify-center w-4.8 h-3.2  ${
							kanbanCtx.boards.length > 0 ? 'opacity-1' : 'opacity-25'
						} bg-purple rounded-2.4  tablet:text-hm tablet:w-16.4 tablet:h-4.8 tablet:text-white  `}
					>
						<span className='tablet:hidden'>
							<img src={plusIcon} alt='' />
						</span>
						<span className='hidden tablet:block'>+ Add New Task</span>
					</Button>

					<img src={iconVertical} alt='' className='h-1.6 tablet:h-2' tabIndex={0} />
				</div>
			</div>
		</header>
	)
}

export default Header
