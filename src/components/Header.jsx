import logo from '../assets/logo-mobile.svg'
import downArrow from '../assets/icon-chevron-down.svg'
import plusIcon from '../assets/icon-add-task-mobile.svg'
import iconVertical from '../assets/icon-vertical-ellipsis.svg'
import logoMobile from '../assets/logo-mobile.svg'
import Button from './UI/Button.jsx'
import { useContext, useState } from 'react'
import KanbanContex from '../store/KanbanContex.jsx'
import EditBoard from './Board/EditBoard.jsx'
import EditPanel from './Board/EditPanel.jsx'
import { AddNewTask } from './Board/AddNewTask.jsx'
import DeleteInformation from './DeleteInformation.jsx'

const initialDeleteState = {
	showEditBoard: false,
	showDeleteColModal: false,
	showDeleteBoardModal: false,
	deleteColId: null,
	deleteCol: false,
}
const Header = ({ handlerToggleShowMobileNav, navIsVisible }) => {
	const { boards, activeBoard, deleteBoard } = useContext(KanbanContex)
	const [editBoard, setEditBoard] = useState(initialDeleteState)
	const [showPanel, setShowPanel] = useState(false)
	const [showAddTask, setShowAddTask] = useState(false)

	function handlerShowEditPanel() {
		setShowPanel(true)
	}
	function handlerHideEditPanel() {
		setShowPanel(false)
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

	function handlerDeleteBoard() {
		const currentBoard = activeBoard
		deleteBoard(currentBoard)
	}
	function handlerShowAddTask() {
		setShowAddTask(true)
	}
	function handlerHideAddTask() {
		setShowAddTask(false)
	}
	return (
		<>
			<header className='flex h-6.4 pl-1.6 pr-0.6 bg-white dark:bg-dark-grey  tablet:h-8 tablet:pl-2.4  tablet:pr-1.4  lg:h-9.6 lg:px-3.4 '>
				<div className='hidden tablet:flex items-center h-full min-w-23.7  lg:min-w-26.6  border-r border-lines-light dark:border-lines-dark  '>
					<img src={logoMobile} alt='' className='h-2.5' />
					<h1 className='dark:text-light-grey pl-1.6 text-3 font-extrabold'>kanban</h1>
				</div>
				<div className='flex items-center justify-between w-full tablet:pl-2.4'>
					<div className='flex gap-x-1.6'>
						<img src={logo} alt='' className='w-2.4 h-2.5 tablet:hidden' tabIndex={0} />
						<Button
							className='flex items-center text-hl dark:text-white tablet:text-2 lg:text-hxl tablet:hidden'
							onClick={handlerToggleShowMobileNav}
						>
							{activeBoard ? activeBoard : 'There is no board'}
							<span className={`px-0.6 ${navIsVisible && 'rotate-180'} transition-transform`}>
								<img src={downArrow} alt='' className='w-0.8 h-0.4 tablet:hidden' />
							</span>
						</Button>
						<h2 className='hidden items-center text-hl dark:text-white tablet:text-2 lg:text-hxl  tablet:flex'>
							{activeBoard ? activeBoard : 'There is no board'}
						</h2>
					</div>
					<div className='flex relative items-center gap-x-1.6'>
						<Button
							className={`flex items-center justify-center w-4.8 h-3.2  ${
								boards.length > 0 ? 'opacity-1' : 'opacity-25'
							} bg-purple rounded-2.4  tablet:text-hm tablet:w-16.4 tablet:h-4.8 tablet:text-white ${
								activeBoard ? '' : 'cursor-not-allowed'
							}`}
							disabled={activeBoard ? false : true}
							onClick={handlerShowAddTask}
						>
							<span className='tablet:hidden'>
								<img src={plusIcon} alt='' />
							</span>
							<span className='hidden tablet:block'>+ Add New Task</span>
						</Button>

						<div className='cursor-pointer p-1 edit-panel-icon' onClick={handlerShowEditPanel}>
							<img src={iconVertical} alt='' className='h-1.6 tablet:h-2' tabIndex={0} />
						</div>
						<EditPanel
							open={showPanel}
							onClose={handlerHideEditPanel}
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
				<DeleteInformation
					open={editBoard.showDeleteColModal}
					deletedElement={editBoard.status}
					onClose={handlerToggleShowDeleteColModal}
					onDelete={handlerDeleteCol}
					deletedInformation={`Are you sure you want to delete the ‘${editBoard.status}’ tasks and its subtasks? This action cannot be reversed.`}
					onCancel={cancelDelete}
				/>
			)}

			<DeleteInformation
				open={editBoard.showDeleteBoardModal}
				onClose={handlerToggleShowDeleteBoardModal}
				onDelete={handlerDeleteBoard}
				deletedInformation={`Are you sure you want to delete the ‘${activeBoard}’ board? This action will remove all columns and tasks and
				cannot be reversed.`}
				deletedElement={activeBoard}
			/>
			{showAddTask && <AddNewTask open={showAddTask} onClose={handlerHideAddTask}></AddNewTask>}
		</>
	)
}

export default Header
