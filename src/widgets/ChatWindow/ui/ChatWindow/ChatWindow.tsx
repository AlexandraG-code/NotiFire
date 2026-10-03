import { ArrowLeftOutlined } from '@ant-design/icons'

import { Button, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useChatSync } from '@features/ChatSync'
import { MessageComposer, useSendMessage } from '@features/SendMessage'

import { AvatarSize, ChatAvatar } from '@entities/Chat'

import { AppRoute } from '@shared/config'
import { Namespace } from '@shared/i18n'
import { ChatBackground } from '@shared/ui'

import { MessageList } from '../MessageList/MessageList'

import styles from './ChatWindow.module.scss'
import type { ChatWindowProps } from './types'

/**
 * Окно диалога: шапка с собеседником (пока грузится история, в ней крутится спиннер), лента сообщений и поле ввода. В узком окне в шапке появляется стрелка назад к списку чатов.
 * @param {Chat} chat - Открытый чат
 * @param {GreenApiCredentials} credentials - Данные инстанса GREEN-API для отправки
 * @returns {JSX.Element} Окно диалога
 */
export const ChatWindow = ({ chat, credentials }: ChatWindowProps) => {
	const navigate = useNavigate()
	const { t } = useTranslation(Namespace.Chat)

	const { send, retry } = useSendMessage(chat, credentials)
	const isSyncing = useChatSync(chat, credentials)

	return (
		<ChatBackground>
			<header className={styles.header}>
				<Button
					className={styles.back}
					type="text"
					shape="circle"
					aria-label={t('window.backToList')}
					icon={<ArrowLeftOutlined />}
					onClick={() => navigate(AppRoute.Root)}
				/>
				<ChatAvatar title={chat.title} src={chat.avatarUrl} size={AvatarSize.Small} />
				<h2 className={styles.title}>{chat.title}</h2>
				{isSyncing && <Spin className={styles.spinner} size="small" aria-label={t('window.loadingHistory')} />}
			</header>
			<MessageList chatId={chat.id} onRetry={retry} />
			<MessageComposer onSend={send} />
		</ChatBackground>
	)
}
