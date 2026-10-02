export enum NotificationMethod {
	ReceiveNotification = 'receiveNotification',
	DeleteNotification = 'deleteNotification'
}

/** Тип уведомления в теле receiveNotification. */
export enum TypeWebhook {
	IncomingMessageReceived = 'incomingMessageReceived',
	OutgoingAPIMessageReceived = 'outgoingAPIMessageReceived'
}

/** Тип сообщения внутри уведомления. */
export enum TypeMessage {
	TextMessage = 'textMessage',
	ExtendedTextMessage = 'extendedTextMessage'
}
