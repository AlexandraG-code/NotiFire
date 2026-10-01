export enum GreenApiMethod {
	GetStateInstance = 'getStateInstance',
	SendMessage = 'sendMessage',
	ReceiveNotification = 'receiveNotification',
	DeleteNotification = 'deleteNotification'
}

export enum StateInstance {
	NotAuthorized = 'notAuthorized',
	Authorized = 'authorized',
	Blocked = 'blocked',
	SleepMode = 'sleepMode',
	Starting = 'starting',
	YellowCard = 'yellowCard'
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
