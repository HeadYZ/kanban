import { useRef } from 'react'
import Modal from '../UI/Modal.jsx'

export default function Task({task}) {
	const taskRef = useRef()
console.log(task);
	return (
		<Modal ref={taskRef}>
			<header>
				<h3></h3>
				<img src='' alt='' />
			</header>
			<main>
				<p></p>
				<span></span>
				<ul>
					<li>
						<input type='checkbox' />  <label htmlFor=""></label>
					</li>
				</ul>
			</main>
			<footer>
				<label htmlFor='status'>Current Status</label>
				<select id='status'>
					<option value=''></option>
					<option value=''></option>
					<option value=''></option>
				</select>
			</footer>
		</Modal>
	)
}
