import { forwardRef } from 'react'
import ReactDOM from 'react-dom'

const ModalOverlay = forwardRef(({ props }, ref) => {
	return (
		<dialog ref={ref} className={`${props.className} backdrop:bg-black backdrop:opacity-50`} onClose={props.onClose}>
			{props.children}
		</dialog>
	)
})

const Modal = forwardRef((props, ref) => {
	return ReactDOM.createPortal(<ModalOverlay props={props} ref={ref} />, document.querySelector('#overlay-root'))
})
export default Modal
