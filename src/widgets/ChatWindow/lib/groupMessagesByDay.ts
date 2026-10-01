import type { Message } from '@entities/Message'

import type { DayGroup } from './types'

/**
 * Группирует сообщения по календарным дням, сохраняя порядок.
 * @param {Message[]} messages - Сообщения чата
 * @returns {DayGroup[]} Группы сообщений по дням
 */
export const groupMessagesByDay = (messages: Message[]): DayGroup[] =>
	messages.reduce<DayGroup[]>((groups, message) => {
		const day = new Date(message.timestamp).setHours(0, 0, 0, 0)
		const last = groups.at(-1) // последняя из уже собранных групп

		if (last?.day === day) last.messages.push(message)
		else groups.push({ day, messages: [message] })

		return groups
	}, [])
