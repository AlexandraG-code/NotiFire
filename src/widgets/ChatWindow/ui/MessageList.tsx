import { useEffect, useMemo, useRef } from 'react'

import { MessageBubble, useMessageStore } from '@entities/Message'
import type { Message } from '@entities/Message'

import { formatDay } from '@shared/lib'

import { getBubblePosition } from '../lib/getBubblePosition'
import { groupMessagesByDay } from '../lib/groupMessagesByDay'

import styles from './MessageList.module.css'
import type { MessageListProps } from './types'

const NO_MESSAGES: Message[] = []

/**
 * Лента сообщений чата с разделителями по дням; при появлении нового сообщения прокручивается вниз.
 * @param {string} chatId - Идентификатор чата
 * @param {Function} onRetry - Повторная отправка неотправленного сообщения
 * @returns {JSX.Element} Лента сообщений
 */
export const MessageList = ({ chatId, onRetry }: MessageListProps) => {
	const messages = useMessageStore((state) => state.byChat[chatId] ?? NO_MESSAGES)

	const endRef = useRef<HTMLDivElement>(null)

	const groups = useMemo(() => groupMessagesByDay(messages), [messages])

	useEffect(() => {
		endRef.current?.scrollIntoView({ block: 'end' })
	}, [messages.length, chatId])

	return (
		<div className={styles.list}>
			{messages.length === 0 && <div className={styles.empty}>Сообщений пока нет. Напишите первым</div>}
			{groups.map((group) => (
				<section key={group.day}>
					<div className={styles.dayRow}>
						<span className={styles.day}>{formatDay(group.day)}</span>
					</div>
					{group.messages.map((message, index) => (
						<MessageBubble
							key={message.id}
							message={message}
							position={getBubblePosition(group.messages, index)}
							onRetry={onRetry}
						/>
					))}
				</section>
			))}
			<div ref={endRef} />
		</div>
	)
}
