import { BubblePosition, type Message } from '@entities/Message'

/**
 * Определяет положение пузыря в серии подряд идущих сообщений одного направления.
 * @param {Message[]} messages - Сообщения одного дня по порядку
 * @param {number} index - Индекс нужного сообщения
 * @returns {BubblePosition} Одиночное, первое, среднее или последнее в серии
 */
export const getBubblePosition = (messages: Message[], index: number): BubblePosition => {
	const { direction } = messages[index]
	const hasPrev = messages[index - 1]?.direction === direction
	const hasNext = messages[index + 1]?.direction === direction

	if (hasPrev && hasNext) return BubblePosition.Middle
	if (hasPrev) return BubblePosition.Bottom
	if (hasNext) return BubblePosition.Upper
	return BubblePosition.Single
}
