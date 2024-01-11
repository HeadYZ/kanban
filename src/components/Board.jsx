import Button from './UI/Button'
import data from '../data.json'

const Board = () => {
	console.log(data)
	if (data.boards.length === 0) {
		return (
			<main className='flex flex-col justify-center items-center gap-2.5  h-calch px-1.6 text-center'>
				<p className='text-hl text-medium-grey'>This board is empty. Create a new column to get started.</p>
				<Button className='flex items-center justify-center w-17.4 h-4.8 bg-purple rounded-2.4 text-hm text-white'>
					+ Add New Column
				</Button>
			</main>
		)
	}
}

export default Board
