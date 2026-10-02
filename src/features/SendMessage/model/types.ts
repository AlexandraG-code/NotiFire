import type { Message } from '@entities/Message'

/**
 * Результат хука отправки сообщений.
 * @property {Function} send - Добавляет сообщение в чат со статусом «отправляется» и отправляет его
 * @property {Function} retry - Повторно отправляет сообщение, которое не удалось отправить
 */
export interface UseSendMessageResult {
	send: (text: string) => Promise<void>
	retry: (message: Message) => Promise<void>
}

export interface MessageComposerProps {
	onSend: (text: string) => void
}
