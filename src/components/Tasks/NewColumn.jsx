import { useState } from 'react'
import iconShowSidebar from '../../assets/icon-show-sidebar.svg'
import Button from '../UI/Button.jsx'
import AddNewColumn from './AddNewColumn.jsx'
export default function NewColumn({ showSidebar, toggleSidebar, currentBoard }) {
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
				className={` relative w-full min-h-calchs tablet:min-h-calcshm lg:min-h-calcshl ${
					showSidebar
						? 'tablet:-translate-x-26.1 lg:-translate-x-30 min-w-wcalc '
						: 'tablet:translate-x-0 min-w-wcalc tablet:min-w-minwtablet lg:min-w-minwdesktop  delay-300 '
				}    transition-all`}
			>
				<div className='flex flex-col h-full justify-center items-center gap-2.5 pl-1.6 pt-2.4 text-center dark:bg-v-dark-grey tablet:pl-2.4 tablet:border-t tablet:border-lines-light dark:tablet:border-lines-dark'>
					<p className='text-hl text-medium-grey sm:pr-2.4 '>
						This board is empty. Create a new column to get started.
					</p>
					<Button
						className='flex items-center justify-center w-17.4 h-4.8 bg-purple lg:hover:bg-purple-hover lg:duration-300 rounded-2.4 text-hm text-white'
						onClick={handlerShowAddNewColumns}
					>
						+ Add New Column
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
			{addNewColumn && (
				<AddNewColumn open={addNewColumn} onClose={handlerHideAddNewColumns} currentBoard={currentBoard} />
			)}
		</>
	)
}
