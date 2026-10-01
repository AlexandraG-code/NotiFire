export interface IncomingMessage {
	/** Идентификатор сообщения в GREEN-API. */
	id: string
	apiChatId: string
	text: string
	/** Время в мс. */
	timestamp: number
	senderName?: string
}

/** Подтверждение отправки через API: показывает настоящий chatId получателя. */
export interface OutgoingConfirmation {
	idMessage: string
	apiChatId: string
}
