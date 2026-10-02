import { useTranslation } from 'react-i18next'
import { NavLink, generatePath } from 'react-router-dom'

import { ChatAvatar } from '@entities/Chat'

import { AppRoute } from '@shared/config'
import { Namespace } from '@shared/i18n'
import { formatTime } from '@shared/lib'

import styles from './ChatListItem.module.scss'
import type { ChatListItemProps } from './types'

/**
 * Строка списка чатов: аватар, название, превью и время последнего сообщения.
 * @param {Chat} chat - Чат
 * @param {Message} [lastMessage] - Последнее сообщение чата, если оно есть
 * @returns {JSX.Element} Ссылка на чат
 */
export const ChatListItem = ({ chat, lastMessage }: ChatListItemProps) => {
	const { t } = useTranslation(Namespace.Chat)

	return (
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
				<div className={styles.preview}>{lastMessage?.text ?? t('sidebar.noMessages')}</div>
			</div>
		</NavLink>
	)
}
