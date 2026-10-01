import { MS_IN_SECOND, type NotificationBody, TypeMessage, TypeWebhook, isGroupChatId } from '@shared/api/greenApi'

import type { IncomingMessage } from '../model/types'

const extractText = ({ messageData }: NotificationBody): string | undefined => {
	switch (messageData?.typeMessage) {
		case TypeMessage.TextMessage:
			return messageData.textMessageData?.textMessage
		case TypeMessage.ExtendedTextMessage:
			return messageData.extendedTextMessageData?.text
		default:
			return undefined
	}
}

/**
 * Достаёт входящее текстовое сообщение из личного чата; медиа, группы и служебные события отбрасывает.
 * @param {NotificationBody} body - Тело уведомления receiveNotification
 * @returns {IncomingMessage | null} Сообщение или null, если уведомление не нужно приложению
 */
export const parseIncomingMessage = (body: NotificationBody): IncomingMessage | null => {
	if (body.typeWebhook !== TypeWebhook.IncomingMessageReceived) return null

	const { senderData, idMessage, timestamp } = body
	const text = extractText(body)
	if (!senderData || !idMessage || !text || isGroupChatId(senderData.chatId)) return null

	return {
		id: idMessage,
		apiChatId: senderData.chatId,
		text,
		timestamp: (timestamp ?? Date.now() / MS_IN_SECOND) * MS_IN_SECOND,
		senderName: senderData.senderName
	}
}
