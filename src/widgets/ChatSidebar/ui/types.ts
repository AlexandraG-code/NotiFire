import type { ReactNode } from 'react'

import type { Chat } from '@entities/Chat'
import type { Message } from '@entities/Message'

export interface ChatListItemProps {
	chat: Chat
	lastMessage?: Message
}

export interface ChatSidebarProps {
	/** Нижний блок панели; передаётся страницей, чтобы виджеты не зависели друг от друга. */
	footer?: ReactNode
}
