import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AppRoute } from '@shared/config'

import { redirectIfAuth, requireAuth } from './guards'

const router = createBrowserRouter([
	{
		path: AppRoute.Login,
		loader: redirectIfAuth,
		lazy: async () => {
			const { AuthPage } = await import('@pages/AuthPage')
			return { Component: AuthPage }
		}
	},
	{
		loader: requireAuth,
		lazy: async () => {
			const { ChatLayout } = await import('@pages/ChatLayout')
			return { Component: ChatLayout }
		},
		children: [
			{
				path: AppRoute.Root,
				lazy: async () => {
					const { EmptyChat } = await import('@pages/EmptyChat')
					return { Component: EmptyChat }
				}
			},
			{
				path: AppRoute.Chat,
				lazy: async () => {
					const { ChatView } = await import('@pages/ChatView')
					return { Component: ChatView }
				}
			}
		]
	},
	{ path: '*', element: <Navigate to={AppRoute.Root} replace /> }
])

/**
 * Роутер приложения: страница входа и защищённые маршруты чата.
 * @returns {JSX.Element} Провайдер роутера
 */
export const AppRouter = () => <RouterProvider router={router} />
