import { forwardRef } from 'react'
import ReactDOM from 'react-dom'

const ModalOverlay = forwardRef(({ props }, ref) => {
	// window.addEventListener('click', e => {
	// 	if (e.target.id === 'dialog') {
	// 	} else {
	// 		return
	// 	}
	// })
	return (
		<dialog
			id='dialog'
			ref={ref}
			className='top-2/4 -translate-y-2/4 w-11/12  mx-auto bg-white dark:bg-dark-grey rounded-0.6 tablet:w-48 backdrop:bg-black backdrop:opacity-50 transition-all duration-1000'
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
