const LOCALE = 'ru-RU'

const timeFormat = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit' })

/**
 * Время сообщения в формате ЧЧ:ММ.
 * @param {number} timestamp - Время в мс
 * @returns {string} Отформатированное время
 */
export const formatTime = (timestamp: number): string => timeFormat.format(timestamp)
