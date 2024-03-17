import { createContext, useState } from 'react'

const VisualContext = createContext({
	theme: 'dark',
	showSidebar: false,
	smallScreen: Boolean,
	toggleTheme: () => {},
	handlerToggleSidebar: () => {},
	handlerToggleShowMobileNav: () => {},
})

export function VisualContextProvider({ children }) {
	const [theme, setTheme] = useState('dark')
	const [showSidebar, setShowSidebar] = useState(false)
	const [showNav, setShowNav] = useState(false)

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
	const handlerToggleShowMobileNav = () => {
		setShowNav(prevShowNav => !prevShowNav)
	}

	const visual = {
		theme,
		toggleTheme,
		showSidebar,
		handlerToggleSidebar,
		showNav,
		handlerToggleShowMobileNav,
	}

	return <VisualContext.Provider value={visual}>{children}</VisualContext.Provider>
}

export default VisualContext
