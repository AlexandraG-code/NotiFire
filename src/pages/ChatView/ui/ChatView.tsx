import { Navigate, useParams } from 'react-router-dom'

import { ChatWindow } from '@widgets/ChatWindow'

import { useAuthStore } from '@features/Auth'

import { useChatStore } from '@entities/Chat'

import { AppRoute } from '@shared/config'

/**
 * Страница диалога: находит чат по chatId из URL, при неизвестном id уводит на главную.
 * @returns {JSX.Element} Окно диалога или редирект
 */
export const ChatView = () => {
	const chats = useChatStore((state) => state.chats)
	const credentials = useAuthStore((state) => state.credentials)

	const { chatId } = useParams()

	const chat = chats.find((item) => item.id === chatId)

	if (!chat || !credentials) {
		return <Navigate to={AppRoute.Root} replace />
	}

	return <ChatWindow key={chat.id} chat={chat} credentials={credentials} />
}
