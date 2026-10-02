import { Suspense } from 'react'

import '@shared/i18n'

import { ErrorNotifier } from './providers/ErrorNotifier'
import { ThemeProvider } from './providers/ThemeProvider'
import { AppRouter } from './routes/AppRouter'

/**
 * Корневой компонент приложения: подключает тему, показ ошибок и роутер.
 * @returns {JSX.Element} Приложение
 */
export function App() {
	return (
		<Suspense fallback={null}>
			<ThemeProvider>
				<ErrorNotifier />
				<AppRouter />
			</ThemeProvider>
		</Suspense>
	)
}
