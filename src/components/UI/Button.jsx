const Button = ({ className, ...props }) => {
	return (
		<button {...props} className={className} autoFocus={false}>
			{props.children}
		</button>
	)
}

export default Button
