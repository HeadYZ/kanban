import IconBoard from '../../assets/IconBoard.jsx'
import Button from '../UI/Button.jsx'
export default function NavItem({ boards, onClose, onSelectBoard, activeBoard: currentBoard }) {
	return boards.map(board => {
		const activeBoardClass = 'bg-purple rounded-r-full text-white'
		const activeBoard = board.name === currentBoard
		return (
			<li
				key={board.name}
				className={`flex group items-center gap-x-1.2 w-24 h-4.8  lg:gap-x-1.6 text-medium-grey ${
					activeBoard && activeBoardClass
				} lg:w-27.6  lg:rounded-r-right-corners lg:hover:text-purple lg:hover:bg-purple-btn lg:dark:hover:bg-white lg:transition-color lg:duration-300`}
				onClick={() => {
					onSelectBoard(board.name)
					onClose()
				}}
			>
				<Button className='flex items-center gap-x-1.2 text-hm w-full h-full pl-2.4 lg:pl-3.2 '>
					<IconBoard fill={activeBoard && 'white'}></IconBoard> {board.name}
				</Button>
			</li>
		)
	})
}
