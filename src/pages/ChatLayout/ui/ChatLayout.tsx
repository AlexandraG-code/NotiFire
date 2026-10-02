import { Navigate, Outlet, useMatch } from 'react-router-dom'

import { ChatSidebar } from '@widgets/ChatSidebar'
import { SettingsMenu } from '@widgets/SettingsMenu'

import { useAuthStore } from '@features/Auth'
import { useNotificationPolling } from '@features/ReceiveMessages'

import { AppRoute } from '@shared/config'
import { SidebarLayout } from '@shared/ui'

/**
 * Страница чата: собирает раскладку из боковой панели со списком чатов и меню настроек и выбранного диалога.
 * Запускает получение сообщений; если пользователь вышел из аккаунта, уводит на страницу входа.
 * @returns {JSX.Element} Раскладка страницы
 */
export const ChatLayout = () => {
	const credentials = useAuthStore((state) => state.credentials)
	const isAuthorized = useAuthStore((state) => state.isAuthorized)

	const isChatOpen = Boolean(useMatch(AppRoute.Chat))

	useNotificationPolling(credentials)

	if (!isAuthorized) {
		return <Navigate to={AppRoute.Login} replace />
	}

	return (
		<SidebarLayout sidebar={<ChatSidebar footer={<SettingsMenu />} />} isContentOpen={isChatOpen}>
			<Outlet />
		</SidebarLayout>
	)
}
