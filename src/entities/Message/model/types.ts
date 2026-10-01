import type { MessageDirection, MessageStatus } from './enums'

export interface Message {
	id: string
	chatId: string
	text: string
	direction: MessageDirection
	timestamp: number
	status: MessageStatus
}

/** Поля сообщения, которые можно изменить после создания. */
export type MessagePatch = Partial<Pick<Message, 'id' | 'status'>>
