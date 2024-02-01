import { createContext, useState } from 'react'

const VisualContext = createContext({
	theme: 'light',
	showSidebar: false,
	smallScreen: Boolean,
	toggleTheme: () => {},
	handlerToggleSidebar: () => {},
})

export function VisualContextProvider({ children }) {
	const [theme, setTheme] = useState('dark')
	const smallScreen = window.innerWidth < 660
	const [showSidebar, setShowSidebar] = useState(false)

	const toggleTheme = () => {
		if (document.body.classList.contains('dark')) {
			document.body.classList.remove('dark')
			document.body.style.backgroundColor = 'rgb(244, 247, 253)'
			setTheme('light')
		} else {
			document.body.classList.add('dark')
			document.body.style.backgroundColor = 'rgb(32,33,44)'
			setTheme('dark')
		}
	}
	const handlerToggleSidebar = () => {
		setShowSidebar(showSidebar => !showSidebar)
	}

	const visual = {
		theme,
		toggleTheme,
		showSidebar,
		handlerToggleSidebar,
		smallScreen,
	}

	return <VisualContext.Provider value={visual}>{children}</VisualContext.Provider>
}

export default VisualContext