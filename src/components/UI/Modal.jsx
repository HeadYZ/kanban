import { forwardRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

const ModalOverlay = forwardRef(({ props }, ref) => {
	const body = document.querySelector('body')

	const handlerAddWindowListener = e => {
		if (e.target.id === 'dialog') {
			ref.current.close()
			window.removeEventListener('click', handlerAddWindowListener)
			return
		}
		if (e.target.closest('.dialog') === null && e.target.closest('#modal') === null) {
			window.removeEventListener('click', handlerAddWindowListener)
			return
		}
	}
	useEffect(() => {
		props.open &&
			setTimeout(() => {
				window.addEventListener('click', handlerAddWindowListener)
				body.classList.add('overflow-hidden')
			}, 10)
	}, [props.open])

	return (
		<dialog
			id='dialog'
			ref={ref}
			className={`top-2/4 -translate-y-2/4 w-11/12  mx-auto bg-white dark:bg-dark-grey rounded-0.6 tablet:w-48 backdrop:bg-black backdrop:opacity-50  ${
				props.open ? 'opacity-100 ' : 'opacity-0'
			} transition-opacity duration-1000`}
			onClose={() => {
				body.classList.remove('overflow-hidden')
				props.onClose()
			}}
		>
			<div className='p-2.4 tablet:p-3.2' id='modal'>
				{props.children}
			</div>
		</dialog>
	)
})

const Modal = forwardRef((props, ref) => {
	return ReactDOM.createPortal(<ModalOverlay props={props} ref={ref} />, document.querySelector('#overlay-root'))
})
export default Modal
