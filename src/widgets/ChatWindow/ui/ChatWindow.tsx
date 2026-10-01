import { ArrowLeftOutlined } from '@ant-design/icons'

import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { MessageComposer, useSendMessage } from '@features/SendMessage'

import { ChatAvatar } from '@entities/Chat'

import { AppRoute } from '@shared/config'
import { ChatBackground } from '@shared/ui'

import styles from './ChatWindow.module.css'
import { MessageList } from './MessageList'
import type { ChatWindowProps } from './types'

const HEADER_AVATAR_SIZE = 40

/**
 * Окно диалога: шапка с собеседником, лента сообщений и поле ввода. В узком окне в шапке появляется стрелка назад к списку чатов.
 * @param {Chat} chat - Открытый чат
 * @param {GreenApiCredentials} credentials - Данные инстанса GREEN-API для отправки
 * @returns {JSX.Element} Окно диалога
 */
export const ChatWindow = ({ chat, credentials }: ChatWindowProps) => {
	const { send, retry } = useSendMessage(chat, credentials)
	const navigate = useNavigate()

	return (
		<ChatBackground>
			<header className={styles.header}>
				<Button
					className={styles.back}
					type="text"
					shape="circle"
					aria-label="К списку чатов"
					icon={<ArrowLeftOutlined />}
					onClick={() => navigate(AppRoute.Root)}
				/>
				<ChatAvatar title={chat.title} size={HEADER_AVATAR_SIZE} />
				<h2 className={styles.title}>{chat.title}</h2>
			</header>
			<MessageList chatId={chat.id} onRetry={retry} />
			<MessageComposer onSend={send} />
		</ChatBackground>
	)
}
