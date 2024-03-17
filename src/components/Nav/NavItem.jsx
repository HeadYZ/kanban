import IconBoard from '../../assets/IconBoard.jsx'
import Button from '../UI/Button.jsx'
export default function NavItem({ boards, onClose, onSelectBoard, activeBoard: currentBoard }) {
	return boards.map(board => {
		const activeBoardClass = 'bg-purple rounded-r-full text-white'
		const activeBoard = board.name === currentBoard
		return (
			<li
				key={board.name}
				tabIndex={0}
				className={`flex group items-center gap-x-1.2 w-24 h-4.8 pl-2.4 lg:pl-3.2 lg:gap-x-1.6 text-medium-grey ${
					activeBoard && activeBoardClass
				} lg:w-27.6  lg:rounded-r-right-corners hover:text-purple hover:bg-purple-btn dark:hover:bg-white transition-color duration-300`}
				onClick={() => {
					onSelectBoard(board.name)
					onClose()
				}}
			>
				<Button className='flex items-center gap-x-1.2 text-hm w-full h-full'>
					<IconBoard fill={activeBoard && 'white'}></IconBoard> {board.name}
				</Button>
			</li>
		)
	})
}
