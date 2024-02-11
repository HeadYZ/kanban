import { useEffect, useRef } from 'react'
import Modal from '../UI/Modal.jsx'
import iconVertical from '../../assets/icon-vertical-ellipsis.svg'
import downArrow from '../../assets/icon-chevron-down.svg'

export default function Task({ task }) {
	const taskRef = useRef()
	useEffect(() => {
		taskRef.current.showModal()
	}, [])
	console.log(task)
	return (
		<Modal
			ref={taskRef}
			className={
				'flex flex-col gap-1.6 top-2/4 -translate-y-2/4 p-2.4 mx-auto   bg-white dark:bg-dark-grey rounded-0.6 '
			}
		>
			<header className='flex items-center gap-1.6'>
				<h3 className='text-hl text-black dark:text-white '>{task.title}</h3>
				<img src={iconVertical} alt='' className='h-2' />
			</header>
			<main className='flex flex-col gap-1.6'>
				<p className='mb-0.8 text-bodyl text-medium-grey'>{task.description}</p>
				<span className='text-bodym text-medium-grey dark:text-white'>Subtask ( of {task.subtasks.length})</span>
				<ul className='flex flex-col gap-0.8'>
					{task.subtasks.map(subtask => {
						return (
							<li
								key={subtask.title}
								className='flex items-center gap-1.6 p-1.2 bg-light-grey dark:bg-v-dark-grey rounded-0.4'
							>
								<input
									type='checkbox'
									checked={subtask.isCompleted === true}
									id={subtask.title}
									className='bg-purple'
								/>
								<label
									htmlFor={subtask.title}
									className={`text-1.2 font-bold ${
										subtask.isCompleted === true && 'opacity-50 line-through'
									} dark:text-white`}
								>
									{subtask.title}
								</label>
							</li>
						)
					})}
				</ul>
			</main>
			<footer className='flex flex-col relative gap-0.8 '>
				<label htmlFor='status' className='text-1.2 font-bold text-medium-grey dark:text-white'>
					Current Status
				</label>
				<select
					id='status'
					className={`appearance-none text-bodyl px-1.6 py-0.8 rounded-0.4 border border-solid border-white-border bg-white text-black dark:text-white  dark:bg-dark-grey `}
				>
					<option value=''>Doing</option>
					<option value=''>nt</option>
					<option value=''></option>
				</select>
				<img src={downArrow} alt='' className='absolute bottom-1.8 right-1.6 h-[0.47rem] w-[0.94rem]' />
			</footer>
		</Modal>
	)
}
