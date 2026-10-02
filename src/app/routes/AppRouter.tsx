import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'

import { AppRoute } from '@shared/config'
import { Namespace, loadNamespaces } from '@shared/i18n'

import { redirectIfAuth, requireAuth } from './guards'

/** Один и тот же вид для `/` (чат не выбран) и `/chat/:chatId`: что показать, решает сама страница. */
const loadChatView = async () => {
	const { ChatView } = await import('@pages/ChatView')
	return { Component: ChatView }
}

const router = createHashRouter([
	{
		path: AppRoute.Login,
		loader: redirectIfAuth,
		lazy: async () => {
			// код страницы и её переводы грузятся вместе и только по её открытию
			const [{ AuthPage }] = await Promise.all([import('@pages/AuthPage'), loadNamespaces(Namespace.Auth)])
			return { Component: AuthPage }
		}
	},
	{
		loader: requireAuth,
		lazy: async () => {
			const [{ ChatLayout }] = await Promise.all([import('@pages/ChatLayout'), loadNamespaces(Namespace.Chat)])
			return { Component: ChatLayout }
		},
		children: [
			{ path: AppRoute.Root, lazy: loadChatView },
			{ path: AppRoute.Chat, lazy: loadChatView }
		]
	},
	{ path: '*', element: <Navigate to={AppRoute.Root} replace /> }
])

/**
 * Роутер приложения: страница входа и защищённые маршруты чата. Маршруты хранятся в части адреса после `#`,
 * поэтому приложение работает на статическом хостинге (GitHub Pages) без настройки перенаправлений.
 * @returns {JSX.Element} Провайдер роутера
 */
export const AppRouter = () => <RouterProvider router={router} />
