export enum MessageDirection {
	Incoming = 'incoming',
	Outgoing = 'outgoing'
}

/** Положение пузыря в серии подряд идущих сообщений одного направления. */
export enum BubblePosition {
	Single = 'single',
	Upper = 'upper',
	Middle = 'middle',
	Bottom = 'bottom'
}

export enum MessageStatus {
	Pending = 'pending',
	Sent = 'sent',
	Failed = 'failed'
}
