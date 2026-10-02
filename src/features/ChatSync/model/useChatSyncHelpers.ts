import { useCallback } from 'react'

import { type ContactInfo } from '@entities/Chat'
import {
	type HistoryMessage,
	HistoryMessageType,
	HistoryTypeMessage,
	type Message,
	MessageDirection,
	MessageStatus
} from '@entities/Message'

import { fromApiTimestamp } from '@shared/api/greenApi'

const TEXT_TYPES: string[] = [HistoryTypeMessage.TextMessage, HistoryTypeMessage.ExtendedTextMessage]

/**
 * Небольшие утилиты синхронизации чата.
 * @returns {{ toMessage: Function, getContactTitle: Function }} Преобразование записи журнала и выбор названия чата
 */
export const useChatSyncHelpers = () => {
	/**
	 * Превращает запись журнала в сообщение приложения; нетекстовые записи отбрасывает.
	 * @param {HistoryMessage} item - Запись из getChatHistory
	 * @param {string} chatId - Идентификатор чата в приложении
	 * @returns {Message | null} Сообщение или null, если записи нет текста
	 */
	const toMessage = useCallback((item: HistoryMessage, chatId: string): Message | null => {
		if (!TEXT_TYPES.includes(item.typeMessage) || !item.textMessage) {
			return null
		}

		return {
			id: item.idMessage,
			chatId,
			text: item.textMessage,
			direction:
				item.type === HistoryMessageType.Incoming ? MessageDirection.Incoming : MessageDirection.Outgoing,
			timestamp: fromApiTimestamp(item.timestamp),
			status: MessageStatus.Sent
		}
	}, [])

	/**
	 * Выбирает название чата из профиля: имя из контактов важнее имени из профиля мессенджера.
	 * @param {ContactInfo} contact - Ответ getContactInfo
	 * @returns {string | undefined} Название или undefined, если у собеседника нет имени
	 */
	const getContactTitle = (contact: ContactInfo): string | undefined =>
		contact.contactName || contact.name || undefined

	return { toMessage, getContactTitle }
}
