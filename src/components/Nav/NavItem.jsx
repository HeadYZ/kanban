import IconBoard from '../../assets/IconBoard.jsx'
import Button from '../UI/Button.jsx'
export default function NavItem({ kanbanCtx, onClose }) {
	return kanbanCtx.boards.map(board => {
		const activeBoardClass = 'bg-purple rounded-r-full text-white'
		const activeBoard = board.name === kanbanCtx.activeBoard
		return (
			<li
				key={board.name}
				tabIndex={0}
				className={`flex items-center gap-x-1.2 w-24 h-4.8 pl-2.4 lg:pl-3.2 lg:gap-x-1.6 text-medium-grey ${
					activeBoard && activeBoardClass
				} lg:w-27.6 `}
				onClick={() => {
					kanbanCtx.selectBoard(board.name)
					onClose()
				}}
			>
				<IconBoard fill={activeBoard && 'white'}></IconBoard>
				<Button className='text-hm '>{board.name}</Button>
			</li>
		)
	})
}
