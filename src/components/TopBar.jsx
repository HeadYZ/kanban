import logo from '../assets/logo-mobile.svg'
import downArrow from '../assets/icon-chevron-down.svg'
import plusIcon from '../assets/icon-add-task-mobile.svg'
import iconVertical from '../assets/icon-vertical-ellipsis.svg'
import Button from './UI/Button'

const TopBar = () => {
	return (
		<nav className='flex items-center justify-between h-6.4 px-1.6 bg-white dark:bg-dark-grey'>
			<div className='flex gap-x-1.6' tabIndex={0}>
				<img src={logo} alt='' className='w-2.4 h-2.5' />
				<p className='flex items-center text-hl dark:text-white '>
					Platform Launch
					<span className='pl-0.6'>
						<img src={downArrow} alt='' className='w-0.8 h-0.4' />
					</span>
				</p>
			</div>
			<div className='flex items-center gap-x-1.6'>
				<Button className='flex items-center justify-center w-4.8 h-3.2 bg-purple rounded-2.4 opacity-25'>
					<img src={plusIcon} alt='' />
				</Button>

				<img src={iconVertical} alt='' className='h-1.6' tabIndex={0} />
			</div>
		</nav>
	)
}

export default TopBar
