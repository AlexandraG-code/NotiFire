/**
 * Входящее текстовое сообщение, разобранное из уведомления.
 * @property {string} id - Идентификатор сообщения в GREEN-API
 * @property {string} apiChatId - chatId отправителя из уведомления
 * @property {string} text - Текст сообщения
 * @property {number} timestamp - Время в мс
 * @property {string} [senderName] - Имя отправителя
 */
export interface IncomingMessage {
	id: string
	apiChatId: string
	text: string
	timestamp: number
	senderName?: string
}

/** Подтверждение отправки через API: показывает настоящий chatId получателя. */
export interface OutgoingConfirmation {
	idMessage: string
	apiChatId: string
}
