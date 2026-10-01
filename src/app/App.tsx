import { ErrorNotifier } from './providers/ErrorNotifier'
import { ThemeProvider } from './providers/ThemeProvider'
import { AppRouter } from './routes/AppRouter'

/**
 * Корневой компонент приложения: подключает тему, показ ошибок и роутер.
 * @returns {JSX.Element} Приложение
 */
export function App() {
	return (
		<ThemeProvider>
			<ErrorNotifier />
			<AppRouter />
		</ThemeProvider>
	)
}
