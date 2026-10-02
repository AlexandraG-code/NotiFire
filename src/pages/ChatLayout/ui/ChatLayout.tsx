import { Navigate, Outlet, useMatch } from 'react-router-dom'

import { ChatSidebar } from '@widgets/ChatSidebar'
import { SettingsMenu } from '@widgets/SettingsMenu'

import { useAuthStore } from '@features/Auth'
import { NotificationsAlert, useInstanceSettings } from '@features/InstanceSettings'
import { useNotificationPolling } from '@features/ReceiveMessages'

import { AppRoute } from '@shared/config'
import { SidebarLayout } from '@shared/ui'

/**
 * Страница чата: собирает раскладку из боковой панели со списком чатов и меню настроек и выбранного диалога.
 * Запускает получение сообщений и проверку уведомлений инстанса; если пользователь вышел из аккаунта, уводит на страницу входа.
 * @returns {JSX.Element} Раскладка страницы
 */
export const ChatLayout = () => {
	const credentials = useAuthStore((state) => state.credentials)
	const isAuthorized = useAuthStore((state) => state.isAuthorized)

	const isChatOpen = Boolean(useMatch(AppRoute.Chat))

	useNotificationPolling(credentials)
	const { status, isSaving, enable } = useInstanceSettings(credentials)

	if (!isAuthorized) {
		return <Navigate to={AppRoute.Login} replace />
	}

	return (
		<SidebarLayout
			sidebar={<ChatSidebar footer={<SettingsMenu />} />}
			banner={<NotificationsAlert status={status} isSaving={isSaving} onEnable={enable} />}
			isContentOpen={isChatOpen}
		>
			<Outlet />
		</SidebarLayout>
	)
}
