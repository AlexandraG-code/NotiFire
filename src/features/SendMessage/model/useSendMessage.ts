import type { Chat } from '@entities/Chat'
import { type Message, MessageDirection, MessageStatus, useMessageStore } from '@entities/Message'

import type { GreenApiCredentials } from '@shared/api/greenApi'

import { SendMessageService } from '../api/sendMessage.service'

import type { UseSendMessageResult } from './types'

/**
 * Хук отправки текста в чат через GREEN-API со статусами «отправляется», «отправлено» и «ошибка».
 * @param {Chat} chat - Чат-получатель
 * @param {GreenApiCredentials} credentials - Данные инстанса GREEN-API
 * @returns {UseSendMessageResult} Функции отправки и повторной отправки
 */
export const useSendMessage = (chat: Chat, credentials: GreenApiCredentials): UseSendMessageResult => {
	const addMessage = useMessageStore((state) => state.addMessage)
	const updateMessage = useMessageStore((state) => state.updateMessage)

	const deliver = async (localId: string, text: string) => {
		try {
			const { idMessage } = await SendMessageService.sendMessage(credentials, {
				chatId: chat.apiChatId,
				message: text
			})
			updateMessage(chat.id, localId, { id: idMessage, status: MessageStatus.Sent })
		} catch {
			updateMessage(chat.id, localId, { status: MessageStatus.Failed })
		}
	}

	const send = async (text: string) => {
		const localId = crypto.randomUUID()
		addMessage({
			id: localId,
			chatId: chat.id,
			text,
			direction: MessageDirection.Outgoing,
			timestamp: Date.now(),
			status: MessageStatus.Pending
		})
		await deliver(localId, text)
	}

	const retry = async (message: Message) => {
		updateMessage(chat.id, message.id, { status: MessageStatus.Pending })
		await deliver(message.id, message.text)
	}

	return { send, retry }
}
