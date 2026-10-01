const LOCALE = 'ru-RU'
const DAY_MS = 24 * 60 * 60 * 1000
const YEAR_SUFFIX = /\s?г\.$/
const TODAY_LABEL = 'Сегодня'
const YESTERDAY_LABEL = 'Вчера'

const dayFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' })

const startOfDay = (timestamp: number): number => new Date(timestamp).setHours(0, 0, 0, 0)

/**
 * Подпись дня для разделителя в ленте.
 * @param {number} timestamp - Время в мс
 * @param {number} [now=Date.now()] - Текущее время в мс, для тестов
 * @returns {string} «Сегодня», «Вчера» или дата вида «1 марта 2026»
 */
export const formatDay = (timestamp: number, now: number = Date.now()): string => {
	const diffDays = Math.round((startOfDay(now) - startOfDay(timestamp)) / DAY_MS)
	if (diffDays === 0) return TODAY_LABEL
	if (diffDays === 1) return YESTERDAY_LABEL
	return dayFormat.format(timestamp).replace(YEAR_SUFFIX, '')
}
