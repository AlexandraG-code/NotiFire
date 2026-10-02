import { Namespace, i18n } from '@shared/i18n'

/** Миллисекунд в сутках: 24 часа × 60 минут × 60 секунд × 1000. */
const DAY_MS = 24 * 60 * 60 * 1000
const TODAY_DIFF = 0
const YESTERDAY_DIFF = 1
const YEAR_SUFFIX = /\s?г\.$/

/** Форматтеры даты по языкам: создаются один раз на язык. */
const dayFormats = new Map<string, Intl.DateTimeFormat>()

/**
 * Форматтер полной даты для языка.
 * @param {string} language - Код языка
 * @returns {Intl.DateTimeFormat} Форматтер вида «1 марта 2026»
 */
const getDayFormat = (language: string): Intl.DateTimeFormat => {
	let format = dayFormats.get(language)
	if (!format) {
		format = new Intl.DateTimeFormat(language, { day: 'numeric', month: 'long', year: 'numeric' })
		dayFormats.set(language, format)
	}
	return format
}

/**
 * Начало суток для момента времени.
 * @param {number} timestamp - Время в мс
 * @returns {number} Время в мс на 00:00:00.000 того же дня
 */
const startOfDay = (timestamp: number): number => new Date(timestamp).setHours(0, 0, 0, 0) // часы, минуты, секунды, мс

/**
 * Подпись дня для разделителя в ленте на текущем языке.
 * @param {number} timestamp - Время в мс
 * @param {number} [now=Date.now()] - Текущее время в мс, для тестов
 * @returns {string} «Сегодня», «Вчера» или дата вида «1 марта 2026»
 */
export const formatDay = (timestamp: number, now: number = Date.now()): string => {
	const diffDays = Math.round((startOfDay(now) - startOfDay(timestamp)) / DAY_MS)
	if (diffDays === TODAY_DIFF) {
		return i18n.t('date.today', { ns: Namespace.Common })
	}
	if (diffDays === YESTERDAY_DIFF) {
		return i18n.t('date.yesterday', { ns: Namespace.Common })
	}
	return getDayFormat(i18n.language).format(timestamp).replace(YEAR_SUFFIX, '')
}
