import { findChatByApiId, useChatStore } from '@entities/Chat'
import { MessageDirection, MessageStatus, useMessageStore } from '@entities/Message'

import { fromChatId } from '@shared/api/greenApi'

import type { IncomingMessage } from './types'

/**
 * Сохраняет входящее сообщение: кладёт в чат, найденный по chatId или его псевдониму, а если чата нет — создаёт новый.
 * @param {IncomingMessage} message - Разобранное входящее сообщение
 * @returns {void}
 */
export const saveIncoming = ({ id, apiChatId, text, timestamp, senderName }: IncomingMessage): void => {
	const { chats, addChat } = useChatStore.getState()
	const chat =
		findChatByApiId(chats, apiChatId) ??
		addChat({ id: fromChatId(apiChatId), apiChatId, title: senderName || `+${fromChatId(apiChatId)}` })

	useMessageStore.getState().addMessage({
		id,
		chatId: chat.id,
		text,
		direction: MessageDirection.Incoming,
		timestamp,
		status: MessageStatus.Sent
	})
}
