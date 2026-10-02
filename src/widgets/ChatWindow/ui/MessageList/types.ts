import type { Message } from '@entities/Message'

export interface MessageListProps {
	chatId: string
	onRetry: (message: Message) => void
}
