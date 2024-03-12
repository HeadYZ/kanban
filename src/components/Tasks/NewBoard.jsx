import { useState } from 'react'
import iconShowSidebar from '../../assets/icon-show-sidebar.svg'
import Button from '../UI/Button.jsx'
import AddNewColumn from './AddNewColumn.jsx'
import AddNewBoard from '../Board/AddNewBoard.jsx'
export default function NewBoard({ showSidebar, toggleSidebar, currentBoard }) {
	const [addNewColumn, setAddNewColumn] = useState(false)
	const handlerShowAddNewColumns = () => {
		setAddNewColumn(true)
	}
	const handlerHideAddNewColumns = () => {
		setAddNewColumn(false)
	}

	return (
		<>
			<main
				className={`flex flex-col justify-center items-center gap-2.5 relative w-full min-h-calchs  pl-1.6 pt-2.4 text-center dark:bg-v-dark-grey tablet:pl-2.4 tablet:min-h-calcshm   lg:min-h-calcshl  tablet:border-t tablet:border-lines-light dark:tablet:border-lines-dark ${
					showSidebar ? 'tablet:translate-x-minus30 min-w-wcalc ' : 'tablet:translate-x-0 min-w-minw delay-300 '
				}  transition-all`}
			>
				<p className='text-hl text-medium-grey sm:pr-2.4 '>This board is empty. Create a new column to get started.</p>
				<Button
					className='flex items-center justify-center w-17.4 h-4.8 bg-purple rounded-2.4 text-hm text-white'
					onClick={handlerShowAddNewColumns}
				>
					+ Add New Column
				</Button>
				<Button
					className={`flex ${
						showSidebar ? 'left-0 opacity-100 delay-300' : 'left-minus5.6 opacity-0 '
					} items-center justify-center absolute bottom-3.2   w-5.6 h-4.8 bg-purple rounded-r-full opacity-0  transition-all `}
					onClick={toggleSidebar}
				>
					<img src={iconShowSidebar} alt='' />
				</Button>
			</main>
			{addNewColumn && (
				<AddNewColumn open={addNewColumn} onClose={handlerHideAddNewColumns} currentBoard={currentBoard} />
			)}
		</>
	)
}
