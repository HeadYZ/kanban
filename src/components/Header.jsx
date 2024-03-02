import logo from '../assets/logo-mobile.svg'
import downArrow from '../assets/icon-chevron-down.svg'
import plusIcon from '../assets/icon-add-task-mobile.svg'
import iconVertical from '../assets/icon-vertical-ellipsis.svg'
import logoMobile from '../assets/logo-mobile.svg'
import Button from './UI/Button.jsx'
import { useContext, useState } from 'react'
import KanbanContex from '../store/KanbanContex.jsx'
import EditBoard from './Board/EditBoard.jsx'
import DeleteColumnBoard from './Board/DeleteColumnBoard.jsx'
import DeleteBoard from './Board/DeleteBoard.jsx'
import EditPanel from './Board/EditPanel.jsx'
import { AddNewTask } from './Board/AddNewTask.jsx'

const initialDeleteState = {
	showEditBoard: false,
	showDeleteColModal: false,
	showDeleteBoardModal: false,
	deleteColId: null,
	deleteCol: false,
}
const Header = ({ handlerToggleShowMobileNav, navIsVisible }) => {
	const kanbanCtx = useContext(KanbanContex)
	const [editBoard, setEditBoard] = useState(initialDeleteState)
	const [showPanel, setShowPanel] = useState(false)
	const [showAddTask, setShowAddTask] = useState(false)
	function handlerToggleShowPanel() {
		setShowPanel(prevShowPanel => !prevShowPanel)
	}

	function handlerToggleShowEditBoard() {
		setShowPanel(false)
		setEditBoard(prevEditBoard => {
			let showBoard
			prevEditBoard.showEditBoard ? (showBoard = false) : (showBoard = true)
			return { ...prevEditBoard, showEditBoard: showBoard }
		})
	}
	function handlerToggleShowDeleteColModal(status) {
		setEditBoard(prevEditBoard => {
			let showDeleteWarning
			prevEditBoard.showDeleteColModal ? (showDeleteWarning = false) : (showDeleteWarning = true)
			return { ...prevEditBoard, showDeleteColModal: showDeleteWarning, status }
		})
	}
	function handlerToggleShowDeleteBoardModal() {
		setShowPanel(false)
		setEditBoard(prevEditBoard => {
			let showDeleteWarning
			prevEditBoard.showDeleteBoardModal ? (showDeleteWarning = false) : (showDeleteWarning = true)
			return { ...prevEditBoard, showDeleteBoardModal: showDeleteWarning }
		})
	}
	function handlerShowDeleteBoardCol(id, status) {
		setEditBoard(prevEditBoard => {
			return { ...prevEditBoard, showDeleteColModal: true, deleteColId: id, status }
		})
	}

	function handlerDeleteCol() {
		setEditBoard(prevEditBoard => {
			let showBoard
			prevEditBoard.showEditBoard ? (showBoard = false) : (showBoard = true)
			return { ...prevEditBoard, showEditBoard: showBoard, deleteCol: true }
		})
	}
	function clearDeleteState() {
		setEditBoard(prevEditBoard => {
			return { ...prevEditBoard, deleteColId: null, deleteCol: false, status: null }
		})
	}
	function cancelDelete() {
		setEditBoard(prevEditBoard => {
			return { ...prevEditBoard, showEditBoard: true, deleteColId: null, deleteCol: false, status: null }
		})
	}

	function deleteBoard() {
		const currentBoard = kanbanCtx.activeBoard
		kanbanCtx.deleteBoard(currentBoard)
	}
	function handlerShowAddTask() {
		setShowAddTask(true)
	}
	function handlerHideAddTask() {
		setShowAddTask(false)
	}
	return (
		<>
			<header className='flex h-6.4 px-1.6 bg-white dark:bg-dark-grey  tablet:h-8 tablet:px-2.4  lg:h-9.6 lg:px-3.4 tablet:border-b tablet:border-lines-light dark:tablet:border-lines-dark'>
				<div className='hidden tablet:flex items-center h-full min-w-23.7  lg:min-w-26.6  border-r border-lines-light dark:border-lines-dark '>
					<img src={logoMobile} alt='' className='h-2.5' />
					<h1 className='dark:text-light-grey pl-1.6 text-3 font-extrabold'>kanban</h1>
				</div>
				<div className='flex items-center justify-between w-full tablet:pl-2.4'>
					<div className='flex gap-x-1.6'>
						<img src={logo} alt='' className='w-2.4 h-2.5 tablet:hidden' tabIndex={0} />
						<Button
							className='flex items-center text-hl dark:text-white tablet:text-2 lg:text-hxl'
							onClick={handlerToggleShowMobileNav}
						>
							{kanbanCtx.activeBoard}
							<span className={`px-0.6 ${navIsVisible && 'rotate-180'} transition-transform`}>
								<img src={downArrow} alt='' className='w-0.8 h-0.4 tablet:hidden' />
							</span>
						</Button>
					</div>
					<div className='flex relative items-center gap-x-1.6'>
						<Button
							className={`flex items-center justify-center w-4.8 h-3.2  ${
								kanbanCtx.boards.length > 0 ? 'opacity-1' : 'opacity-25'
							} bg-purple rounded-2.4  tablet:text-hm tablet:w-16.4 tablet:h-4.8 tablet:text-white  `}
							onClick={handlerShowAddTask}
						>
							<span className='tablet:hidden'>
								<img src={plusIcon} alt='' />
							</span>
							<span className='hidden tablet:block'>+ Add New Task</span>
						</Button>

						<div className='cursor-pointer' onClick={handlerToggleShowPanel}>
							<img src={iconVertical} alt='' className='h-1.6 tablet:h-2' tabIndex={0} />
						</div>
						<EditPanel
							open={showPanel}
							onClose={handlerToggleShowPanel}
							showPanel={handlerToggleShowEditBoard}
							showDeleteWarning={handlerToggleShowDeleteBoardModal}
							editInfo='Edit Board'
							deleteInfo='Delete Board'
							position='-right-1 top-4  tablet:top-6 lg:top-6.4'
						/>
					</div>
				</div>
			</header>

			<EditBoard
				open={editBoard.showEditBoard}
				onClose={handlerToggleShowEditBoard}
				showWarning={handlerShowDeleteBoardCol}
				deleteCol={editBoard.deleteCol}
				deleteColId={editBoard.deleteColId}
				clearDeleteState={clearDeleteState}
			></EditBoard>
			{editBoard.showDeleteColModal && (
				<DeleteColumnBoard
					open={editBoard.showDeleteColModal}
					status={editBoard.status}
					onClose={handlerToggleShowDeleteColModal}
					deleteCol={handlerDeleteCol}
					onCancel={cancelDelete}
				/>
			)}

			<DeleteBoard
				open={editBoard.showDeleteBoardModal}
				onClose={handlerToggleShowDeleteBoardModal}
				onDelete={deleteBoard}
				currentBoard={kanbanCtx.activeBoard}
			/>
			{showAddTask && <AddNewTask open={showAddTask} onClose={handlerHideAddTask}></AddNewTask>}
		</>
	)
}

export default Header
