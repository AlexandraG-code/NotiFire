import type { Message } from '@entities/Message'

/**
 * Сообщения одного календарного дня.
 * @property {number} day - Начало дня в мс: стабильный ключ группы
 * @property {Message[]} messages - Сообщения этого дня по порядку
 */
export interface DayGroup {
	day: number
	messages: Message[]
}
