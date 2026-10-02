/**
 * Достаёт из пойманного значения текст, который можно показать пользователю.
 * @param {unknown} error - Значение из catch или причина отклонённого промиса
 * @returns {string | undefined} Текст ошибки или undefined, если подходящего текста нет
 */
export const getErrorMessage = (error: unknown): string | undefined => {
	if (error instanceof Error) {
		return error.message || undefined
	}
	return typeof error === 'string' ? error : undefined
}
