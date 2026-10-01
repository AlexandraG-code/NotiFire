import type { Chat } from '@entities/Chat'
import type { Message } from '@entities/Message'

export interface ChatListItemProps {
	chat: Chat
	lastMessage?: Message
}
