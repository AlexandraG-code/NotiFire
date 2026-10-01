import type { Chat } from '@entities/Chat'
import type { Message } from '@entities/Message'

import type { GreenApiCredentials } from '@shared/api/greenApi'

export interface ChatWindowProps {
	chat: Chat
	credentials: GreenApiCredentials
}

export interface MessageListProps {
	chatId: string
	onRetry: (message: Message) => void
}
