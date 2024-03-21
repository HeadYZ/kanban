import { useState } from 'react'
import iconShowSidebar from '../../assets/icon-show-sidebar.svg'
import Button from '../UI/Button.jsx'
import AddNewBoard from '../Board/AddNewBoard.jsx'
export default function NewBoard({ showSidebar, toggleSidebar, currentBoard, onAddBoard }) {
	const [addNewBoard, setAddNewBoard] = useState(false)
	const handlerShowAddNewBoard = () => {
		setAddNewBoard(true)
	}
	const handlerHideAddNewBoard = () => {
		setAddNewBoard(false)
	}

	return (
		<>
			<main
				className={` w-full min-h-calchs tablet:min-h-calcshm lg:min-h-calcshl ${
					showSidebar
						? 'tablet:-translate-x-26.1 lg:-translate-x-30 min-w-wcalc '
						: 'tablet:translate-x-0 min-w-wcalc tablet:min-w-minwtablet lg:min-w-minwdesktop  delay-300 '
				}   transition-all`}
			>
				<div className='flex flex-col justify-center items-center gap-2.5 min-h-calchs tablet:min-h-calcshm lg:min-h-calcshl  pt-2.4  pl-1.6  tablet:pl-2.4 text-center relative dark:bg-v-dark-grey tablet:border-t tablet:border-lines-light dark:tablet:border-lines-dark'>
					<p className='text-hl text-medium-grey sm:pr-2.4 '>No Boards. Create a new board to get started.</p>
					<Button
						className='flex items-center justify-center w-17.4 h-4.8 bg-purple rounded-2.4 text-hm text-white lg:hover:bg-purple-hover lg:transition lg:ease-out lg:duration-300'
						onClick={handlerShowAddNewBoard}
					>
						+ Add New Board
					</Button>
					<div
						className={`fixed bottom-3.2  ${
							showSidebar ? 'left-0 opacity-100 delay-300' : 'left-minus5.6 opacity-0 '
						} transition-all`}
					>
						<Button
							className={`flex  items-center justify-center   w-5.6 h-4.8 bg-purple rounded-r-full lg:hover:bg-purple-hover lg:duration-300   `}
							onClick={toggleSidebar}
						>
							<img src={iconShowSidebar} alt='' />
						</Button>
					</div>
				</div>
			</main>
			{addNewBoard && (
				<AddNewBoard
					open={addNewBoard}
					onClose={handlerHideAddNewBoard}
					currentBoard={currentBoard}
					onAddBoard={onAddBoard}
				/>
			)}
		</>
	)
}
