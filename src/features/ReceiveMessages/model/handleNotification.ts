import type { NotificationBody } from '../api/types'
import { parseIncomingMessage } from '../lib/parseIncomingMessage'
import { parseOutgoingConfirmation } from '../lib/parseOutgoingConfirmation'

import { linkOutgoing } from './linkOutgoing'
import { saveIncoming } from './saveIncoming'

/**
 * Обрабатывает одно уведомление: сохраняет входящее сообщение или привязывает chatId по подтверждению отправки.
 * @param {NotificationBody} body - Тело уведомления receiveNotification
 * @returns {void}
 */
export const handleNotification = (body: NotificationBody): void => {
	const incoming = parseIncomingMessage(body)
	if (incoming) {
		saveIncoming(incoming)
		return
	}

	const confirmation = parseOutgoingConfirmation(body)

	if (confirmation) {
		void linkOutgoing(confirmation)
	}
}
