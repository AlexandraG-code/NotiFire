import { i18n } from '@shared/i18n'

/** Форматтеры времени по языкам: создаются один раз на язык. */
const timeFormats = new Map<string, Intl.DateTimeFormat>()

/**
 * Форматтер времени для языка.
 * @param {string} language - Код языка
 * @returns {Intl.DateTimeFormat} Форматтер часов и минут
 */
const getTimeFormat = (language: string): Intl.DateTimeFormat => {
	let format = timeFormats.get(language)
	if (!format) {
		format = new Intl.DateTimeFormat(language, { hour: '2-digit', minute: '2-digit' })
		timeFormats.set(language, format)
	}
	return format
}

/**
 * Время сообщения в формате текущего языка.
 * @param {number} timestamp - Время в мс
 * @returns {string} Отформатированное время
 */
export const formatTime = (timestamp: number): string => getTimeFormat(i18n.language).format(timestamp)
