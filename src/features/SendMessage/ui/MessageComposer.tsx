import { SendOutlined } from '@ant-design/icons'

import { type KeyboardEvent, useState } from 'react'

import { Button, Input } from 'antd'

import styles from './MessageComposer.module.scss'
import type { MessageComposerProps } from './types'

const MAX_ROWS = 6

/**
 * Поле ввода сообщения: Enter отправляет, Shift+Enter — перенос строки.
 * @param {Function} onSend - Вызывается с текстом сообщения при отправке
 * @returns {JSX.Element} Поле ввода с кнопкой отправки
 */
export const MessageComposer = ({ onSend }: MessageComposerProps) => {
	const [text, setText] = useState('')

	const trimmed = text.trim()

	const submit = () => {
		if (!trimmed) {
			return
		}

		onSend(trimmed)
		setText('')
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key !== 'Enter' || event.shiftKey) {
			return
		}

		event.preventDefault()
		submit()
	}

	return (
		<div className={styles.composer}>
			<div className={styles.pill}>
				<Input.TextArea
					className={styles.input}
					autoFocus
					variant="borderless"
					value={text}
					placeholder="Сообщение"
					autoSize={{ minRows: 1, maxRows: MAX_ROWS }}
					onChange={(event) => setText(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<Button
					type="primary"
					shape="circle"
					size="large"
					aria-label="Отправить"
					icon={<SendOutlined />}
					disabled={!trimmed}
					onClick={submit}
				/>
			</div>
		</div>
	)
}
