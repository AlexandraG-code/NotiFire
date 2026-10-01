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

export interface MessageState {
	byChat: Record<string, Message[]>
}

export interface MessageActions {
	/** Добавляет сообщение; если сообщение с таким id в чате уже есть, ничего не делает. */
	addMessage: (message: Message) => void
	updateMessage: (chatId: string, id: string, patch: MessagePatch) => void
	/** Переносит все сообщения одного чата в другой (при слиянии дублей), сохраняя порядок по времени. */
	/** Удаляет все сообщения. */
	reset: () => void
	moveMessages: (fromChatId: string, toChatId: string) => void
}

export type MessageStore = MessageState & MessageActions
