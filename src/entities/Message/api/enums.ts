export enum MessageMethod {
	GetChatHistory = 'getChatHistory'
}

/** Направление сообщения в ответе журнала. */
export enum HistoryMessageType {
	Incoming = 'incoming',
	Outgoing = 'outgoing'
}

/** Тип сообщения в ответе журнала; приложение показывает только текстовые. */
export enum HistoryTypeMessage {
	TextMessage = 'textMessage',
	ExtendedTextMessage = 'extendedTextMessage'
}
