import type { Message } from '@entities/Message'

export interface DayGroup {
	/** Начало дня в мс — стабильный ключ группы. */
	day: number
	messages: Message[]
}
