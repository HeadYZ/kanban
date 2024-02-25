import Button from '../UI/Button.jsx'

export default function EditPanel({ open, showEditBoard, showDeleteBoardWarning }) {
	return (
		<div
			className={`flex flex-col gap-1.6 ${
				open ? 'absolute' : 'hidden'
			} -right-1 top-4  tablet:top-6 lg:top-6.4 w-19.2 p-1.6 z-10 bg-white dark:bg-v-dark-grey rounded-0.8`}
		>
			<Button className='text-bodyl text-medium-grey text-left' onClick={showEditBoard}>
				Edit Board
			</Button>
			<Button className='text-bodyl text-red text-left' onClick={showDeleteBoardWarning}>
				Delete Board
			</Button>
		</div>
	)
}
