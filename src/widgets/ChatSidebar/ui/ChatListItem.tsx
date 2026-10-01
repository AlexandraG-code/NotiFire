import { NavLink, generatePath } from 'react-router-dom'

import { ChatAvatar } from '@entities/Chat'

import { AppRoute } from '@shared/config'
import { formatTime } from '@shared/lib'

import styles from './ChatListItem.module.css'
import type { ChatListItemProps } from './types'

/**
 * Строка списка чатов: аватар, название, превью и время последнего сообщения.
 * @param {Chat} chat - Чат
 * @param {Message} [lastMessage] - Последнее сообщение чата, если оно есть
 * @returns {JSX.Element} Ссылка на чат
 */
export const ChatListItem = ({ chat, lastMessage }: ChatListItemProps) => (
	<NavLink
		to={generatePath(AppRoute.Chat, { chatId: chat.id })}
		className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
	>
		<ChatAvatar title={chat.title} />
		<div className={styles.body}>
			<div className={styles.top}>
				<span className={styles.title}>{chat.title}</span>
				{lastMessage && <span className={styles.time}>{formatTime(lastMessage.timestamp)}</span>}
			</div>
			<div className={styles.preview}>{lastMessage?.text ?? 'Нет сообщений'}</div>
		</div>
	</NavLink>
)
