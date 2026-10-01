const LOCALE = 'ru-RU'
/** Миллисекунд в сутках: 24 часа × 60 минут × 60 секунд × 1000. */
const DAY_MS = 24 * 60 * 60 * 1000
const TODAY_DIFF = 0
const YESTERDAY_DIFF = 1
const YEAR_SUFFIX = /\s?г\.$/
const TODAY_LABEL = 'Сегодня'
const YESTERDAY_LABEL = 'Вчера'

const dayFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' })

/**
 * Начало суток для момента времени.
 * @param {number} timestamp - Время в мс
 * @returns {number} Время в мс на 00:00:00.000 того же дня
 */
const startOfDay = (timestamp: number): number => new Date(timestamp).setHours(0, 0, 0, 0) // часы, минуты, секунды, мс

/**
 * Подпись дня для разделителя в ленте.
 * @param {number} timestamp - Время в мс
 * @param {number} [now=Date.now()] - Текущее время в мс, для тестов
 * @returns {string} «Сегодня», «Вчера» или дата вида «1 марта 2026»
 */
export const formatDay = (timestamp: number, now: number = Date.now()): string => {
	const diffDays = Math.round((startOfDay(now) - startOfDay(timestamp)) / DAY_MS)
	if (diffDays === TODAY_DIFF) return TODAY_LABEL
	if (diffDays === YESTERDAY_DIFF) return YESTERDAY_LABEL
	return dayFormat.format(timestamp).replace(YEAR_SUFFIX, '')
}
