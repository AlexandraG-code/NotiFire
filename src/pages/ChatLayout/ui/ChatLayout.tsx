import { Outlet, useMatch } from 'react-router-dom'

import { ChatSidebar } from '@widgets/ChatSidebar'

import { useAuthStore } from '@features/Auth'
import { useNotificationPolling } from '@features/ReceiveMessages'

import { AppRoute } from '@shared/config'

import styles from './ChatLayout.module.scss'

/**
 * Каркас чата: боковая панель слева, выбранный диалог справа. В узком окне показывает что-то одно: список чатов или диалог.
 * @returns {JSX.Element} Каркас страницы
 */
export const ChatLayout = () => {
	const credentials = useAuthStore((state) => state.credentials)

	const isChatOpen = Boolean(useMatch(AppRoute.Chat))

	useNotificationPolling(credentials)

	return (
		<div className={styles.layout} data-chat-open={isChatOpen}>
			<div className={styles.sidebarPane}>
				<ChatSidebar />
			</div>
			<div className={styles.contentPane}>
				<Outlet />
			</div>
		</div>
	)
}
