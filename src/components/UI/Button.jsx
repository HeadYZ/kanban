const Button = ({ className, ...props }) => {
	return (
		<button {...props} className={className}>
			{props.children}
		</button>
	)
}

export default Button
