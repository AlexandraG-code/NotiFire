import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

// Заполняет window._env_ до импорта остального кода приложения
import '../../env-config'

import { App } from './App'
import './styles/index.scss'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
