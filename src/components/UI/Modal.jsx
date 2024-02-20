import { forwardRef } from 'react'
import ReactDOM from 'react-dom'

const ModalOverlay = forwardRef(({ props }, ref) => {
	return (
		<dialog
			ref={ref}
			className='top-2/4 -translate-y-2/4 w-11/12 p-2.4 mx-auto bg-white dark:bg-dark-grey rounded-0.6 tablet:w-48 tablet:p-3.2 backdrop:bg-black backdrop:opacity-50'
			onClose={props.onClose}
		>
			{props.children}
		</dialog>
	)
})

const Modal = forwardRef((props, ref) => {
	return ReactDOM.createPortal(<ModalOverlay props={props} ref={ref} />, document.querySelector('#overlay-root'))
})
export default Modal
