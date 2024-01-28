import { useRef } from 'react'
import sunIcon from '../assets/icon-light-theme.svg'
import moonIcon from '../assets/icon-dark-theme.svg'
import IconBoard from '../assets/IconBoard.jsx'
import Button from './UI/Button'
import Modal from './UI/Modal.jsx'

const Boards = ({ boards, showNav }) => {
	const boardRef = useRef()

	const hideBoardsMenuHandler = () => {
		window.addEventListener('click', e => {
			if (e.target === boardRef.current) {
				boardRef.current.close()
			}
			console.log(e.target)
		})
	}

	showNav && boardRef.current.showModal()
	showNav && hideBoardsMenuHandler()
	return (
		<Modal ref={boardRef}>
			<aside className='rounded-0.8'>
				<header className='pt-1.6'>
					<h2 className='text-1.2 pl-2.4 font-bold tracking-tight text-medium-grey uppercase'>
						All boards ({boards.length})
					</h2>
				</header>
				<main>
					<ul className='pt-1.9'>
						{boards.map(board => (
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
				<footer className='flex items-center h-4.8 my-1.6'>
					<img src={sunIcon} alt='' />
					<button></button>
					<img src={moonIcon} alt='' />
				</footer>
			</aside>
		</Modal>
	)
}

export default Boards
