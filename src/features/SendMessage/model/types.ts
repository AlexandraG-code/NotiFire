import type { Message } from '@entities/Message'

export interface UseSendMessageResult {
	/** Добавляет сообщение в чат со статусом «отправляется» и отправляет его. */
	send: (text: string) => Promise<void>
	/** Повторно отправляет сообщение, которое не удалось отправить. */
	retry: (message: Message) => Promise<void>
}
