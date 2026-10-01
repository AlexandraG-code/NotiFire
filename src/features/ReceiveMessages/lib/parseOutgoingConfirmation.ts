import { type NotificationBody, TypeWebhook, isGroupChatId } from '@shared/api/greenApi'

import type { OutgoingConfirmation } from '../model/types'

/**
 * Достаёт из уведомления об отправке через API идентификатор сообщения и chatId получателя.
 * @param {NotificationBody} body - Тело уведомления receiveNotification
 * @returns {OutgoingConfirmation | null} Подтверждение или null, если это уведомление другого типа
 */
export const parseOutgoingConfirmation = (body: NotificationBody): OutgoingConfirmation | null => {
	if (body.typeWebhook !== TypeWebhook.OutgoingAPIMessageReceived) return null

	const { idMessage, senderData } = body
	if (!idMessage || !senderData?.chatId || isGroupChatId(senderData.chatId)) return null

	return { idMessage, apiChatId: senderData.chatId }
}
