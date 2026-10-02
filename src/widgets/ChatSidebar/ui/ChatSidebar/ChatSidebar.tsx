import { PlusOutlined } from '@ant-design/icons'

import { useState } from 'react'

import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

import { CreateChatModal } from '@features/CreateChat'

import { useChatStore } from '@entities/Chat'
import { useMessageStore } from '@entities/Message'

import { Namespace } from '@shared/i18n'

import { ChatListItem } from '../ChatListItem/ChatListItem'

import styles from './ChatSidebar.module.scss'
import type { ChatSidebarProps } from './types'

/**
 * Боковая панель: заголовок с кнопкой нового чата, список чатов и меню настроек.
 * @param {ReactNode} [footer] - Нижний блок панели (например, меню настроек), его передаёт страница
 * @returns {JSX.Element} Сайдбар
 */
export const ChatSidebar = ({ footer }: ChatSidebarProps) => {
	const chats = useChatStore((state) => state.chats)
	const byChat = useMessageStore((state) => state.byChat)

	const [isModalOpen, setIsModalOpen] = useState(false)

	const { t } = useTranslation(Namespace.Chat)

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<h1 className={styles.heading}>{t('sidebar.title')}</h1>
				<Button
					type="primary"
					shape="circle"
					aria-label={t('sidebar.newChat')}
					icon={<PlusOutlined />}
					onClick={() => setIsModalOpen(true)}
				/>
			</div>
			<div className={styles.list}>
				{chats.length === 0 && <div className={styles.empty}>{t('sidebar.empty')}</div>}
				{chats.map((chat) => (
					<ChatListItem key={chat.id} chat={chat} lastMessage={byChat[chat.id]?.at(-1)} /> // at(-1): последнее сообщение чата
				))}
			</div>
			{footer}
			<CreateChatModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</aside>
	)
}
