import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons'

import { formatTime } from '@shared/lib'

import { BubblePosition, MessageDirection, MessageStatus } from '../model/enums'

import styles from './MessageBubble.module.css'
import type { MessageBubbleProps } from './types'

/**
 * Пузырь сообщения: свои справа, входящие слева, время и статус внутри пузыря.
 * @param {Message} message - Сообщение для отображения
 * @param {BubblePosition} [position='single'] - Положение в серии сообщений: от него зависят закругления углов
 * @param {Function} [onRetry] - Повторная отправка; вызывается кнопкой у неотправленного сообщения
 * @returns {JSX.Element} Пузырь сообщения
 */
export const MessageBubble = ({ message, position = BubblePosition.Single, onRetry }: MessageBubbleProps) => {
	const isOutgoing = message.direction === MessageDirection.Outgoing

	return (
		<div className={`${styles.row} ${styles[position]} ${isOutgoing ? styles.rowOutgoing : ''}`}>
			<div className={`${styles.bubble} ${isOutgoing ? styles.outgoing : styles.incoming}`}>
				<span className={styles.text}>{message.text}</span>
				<span className={styles.meta}>
					{message.status === MessageStatus.Failed && (
						<button type="button" className={styles.retry} onClick={() => onRetry?.(message)}>
							Не отправлено · Повторить
						</button>
					)}
					<span className={styles.time}>{formatTime(message.timestamp)}</span>
					{isOutgoing && message.status === MessageStatus.Pending && <ClockCircleOutlined />}
					{isOutgoing && message.status === MessageStatus.Sent && <CheckOutlined />}
				</span>
			</div>
		</div>
	)
}
