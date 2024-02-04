import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { VisualContextProvider } from './store/VisualContext.jsx'
import { KanbanContextProvider } from './store/KanbanContex.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<VisualContextProvider>
			<KanbanContextProvider>
				<App />
			</KanbanContextProvider>
		</VisualContextProvider>
	</React.StrictMode>
)
