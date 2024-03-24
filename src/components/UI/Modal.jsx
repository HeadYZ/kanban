import { forwardRef } from 'react'
import ReactDOM from 'react-dom'

const ModalOverlay = forwardRef(({ props }, ref) => {
	const handlerAddWindowListener = e => {
		console.log(props.open)
		if (e.target.id === 'dialog') {
			ref.current.close()
			window.removeEventListener('click', handlerAddWindowListener)
		} else {
			return
		}
	}

	props.open && window.addEventListener('click', handlerAddWindowListener)

	return (
		<dialog
			id='dialog'
			ref={ref}
			className='top-2/4 -translate-y-2/4 w-11/12  mx-auto bg-white dark:bg-dark-grey rounded-0.6 tablet:w-48 backdrop:bg-black backdrop:opacity-50'
			onClose={props.onClose}
		>
			<div className='p-2.4 tablet:p-3.2'>{props.children}</div>
		</dialog>
	)
})

const Modal = forwardRef((props, ref) => {
	return ReactDOM.createPortal(<ModalOverlay props={props} ref={ref} />, document.querySelector('#overlay-root'))
})
export default Modal
