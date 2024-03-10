import Header from './components/Header.jsx'
import Tasks from './components/Tasks/Tasks.jsx'
import { useState } from 'react'
import Nav from './components/Nav/Nav.jsx'
import useHttp from './hooks/useHttp.jsx'
import logoMobile from './assets/logo-mobile.svg'
import Spinner from './components/UI/Spinner.jsx'

function App() {
	const { data: boards, isLoading, error } = useHttp('https://kanban-f64b7-default-rtdb.firebaseio.com/boards.json', [])

	const [showNav, setShowNav] = useState(false)

	function handlerToggleShowMobileNav() {
		setShowNav(prevShowNav => !prevShowNav)
	}
	console.log('app')
	return (
		<>
			{isLoading && (
				<div className='bg-white flex-col flex items-center justify-center h-svh w-full'>
					<div className='flex gap-1 mb-1.6 items-center'>
						<img src={logoMobile} alt='' className='h-3 tablet:h-4 lg:h-5.4' />
						<p className='text-3  font-bold tablet:text-5 lg:text-7'>Kanban</p>
					</div>
					<Spinner></Spinner>
				</div>
			)}
			{!isLoading && !error && (
				<Header handlerToggleShowMobileNav={handlerToggleShowMobileNav} navIsVisible={showNav} />
			)}
			{!isLoading && !error && (
				<div className=' flex relative tablet:h-calcshm lg:h-calcshl overflow-hidden'>
					<Nav showNav={showNav} onClose={handlerToggleShowMobileNav} />
					<Tasks boards={boards} />
				</div>
			)}
		</>
	)
}

export default App
{
	/* <div className='flex relative tablet:h-calcshm lg:h-calcshl overflow-x-auto overflow-y-hidden'> */
}
