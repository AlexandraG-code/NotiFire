import { PlusOutlined } from '@ant-design/icons'

import { useState } from 'react'

import { Button } from 'antd'

import { CreateChatModal } from '@features/CreateChat'

import { useChatStore } from '@entities/Chat'
import { useMessageStore } from '@entities/Message'

import { ChatListItem } from './ChatListItem'
import styles from './ChatSidebar.module.scss'
import { SettingsMenu } from './SettingsMenu'

/**
 * Боковая панель: заголовок с кнопкой нового чата, список чатов и меню настроек.
 * @returns {JSX.Element} Сайдбар
 */
export const ChatSidebar = () => {
	const chats = useChatStore((state) => state.chats)
	const byChat = useMessageStore((state) => state.byChat)

	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<h1 className={styles.heading}>Чаты</h1>
				<Button
					type="primary"
					shape="circle"
					aria-label="Новый чат"
					icon={<PlusOutlined />}
					onClick={() => setIsModalOpen(true)}
				/>
			</div>
			<div className={styles.list}>
				{chats.length === 0 && <div className={styles.empty}>Создайте первый чат кнопкой «+»</div>}
				{chats.map((chat) => (
					<ChatListItem key={chat.id} chat={chat} lastMessage={byChat[chat.id]?.at(-1)} /> // at(-1): последнее сообщение чата
				))}
			</div>
			<SettingsMenu />
			<CreateChatModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</aside>
	)
}
