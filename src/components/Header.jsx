import logo from '../assets/logo-mobile.svg'
import downArrow from '../assets/icon-chevron-down.svg'
import plusIcon from '../assets/icon-add-task-mobile.svg'
import iconVertical from '../assets/icon-vertical-ellipsis.svg'
import Button from './UI/Button.jsx'

const Header = ({ showMobileNavHandler, smallScreen }) => {
	return (
		<header className='flex items-center justify-between h-6.4 px-1.6 bg-white dark:bg-dark-grey sm:col-start-2 sm:col-end-2 sm:row-start-1 sm:h-8 sm:px-2.4 sm:border-b sm:border-lines-light dark:sm:border-lines-dark'>
			<div className='flex gap-x-1.6'>
				<img src={logo} alt='' className='w-2.4 h-2.5 sm:hidden' tabIndex={0} />
				<Button
					className='flex items-center text-hl dark:text-white sm:text-2'
					onClick={smallScreen ? showMobileNavHandler : null}
				>
					Platform Launch
					<span className='pl-0.6'>
						<img src={downArrow} alt='' className='w-0.8 h-0.4 sm:hidden' />
					</span>
				</Button>
			</div>
			<div className='flex items-center gap-x-1.6'>
				<Button className='flex items-center justify-center w-4.8 h-3.2 bg-purple rounded-2.4 opacity-25'>
					<img src={plusIcon} alt='' />
				</Button>

				<img src={iconVertical} alt='' className='h-1.6' tabIndex={0} />
			</div>
		</header>
	)
}

export default Header
