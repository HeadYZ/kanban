export default function TaskList({ boards }) {
	return (
		<section className='flex pl-1.6 gap-x-2.4 py-2.4 overflow-hidden'>
			{boards[0].columns.map(board => {
				return (
					<ul key={board.name} className='min-w-28 '>
						<li className='mb-2.4 text-hs text-medium-grey uppercase'>
							{board.name} ({board.tasks.length})
						</li>
						{board.tasks.map(task => {
							return (
								<li key={task.title} className=' mb-2 px-1.6 py-2.3 bg-dark-grey rounded-0.8 '>
									<p className='text-hm text-white'>{task.title}</p>
									<span className='text-bodym text-medium-grey'>0 of {task.subtasks.length} subtasks</span>
								</li>
							)
						})}
					</ul>
				)
			})}
		</section>
	)
}
