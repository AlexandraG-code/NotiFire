import { Navigate, useParams } from 'react-router-dom'

import { ChatPlaceholder, ChatWindow } from '@widgets/ChatWindow'

import { useAuthStore } from '@features/Auth'

import { useChatStore } from '@entities/Chat'

import { AppRoute } from '@shared/config'

/**
 * Страница области диалога: по chatId из адреса показывает диалог, без chatId — подсказку «выберите чат»,
 * а при неизвестном id уводит на главную.
 * @returns {JSX.Element} Окно диалога, заглушка или редирект
 */
export const ChatView = () => {
	const chats = useChatStore((state) => state.chats)
	const credentials = useAuthStore((state) => state.credentials)

	const { chatId } = useParams()

	const chat = chats.find((item) => item.id === chatId)

	if (!chatId) {
		return <ChatPlaceholder />
	}

	if (!chat || !credentials) {
		return <Navigate to={AppRoute.Root} replace />
	}

	return <ChatWindow key={chat.id} chat={chat} credentials={credentials} />
}
