import type { ReactNode } from 'react'

import type { Chat } from '@entities/Chat'
import type { Message } from '@entities/Message'

export interface ChatListItemProps {
	chat: Chat
	lastMessage?: Message
}

/**
 * Свойства боковой панели чатов.
 * @property {ReactNode} [footer] - Нижний блок панели; передаётся страницей, чтобы виджеты не зависели друг от друга
 */
export interface ChatSidebarProps {
	footer?: ReactNode
}
