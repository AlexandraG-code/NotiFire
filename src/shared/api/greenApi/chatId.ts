import { CHAT_ID_PRIVATE_SUFFIX, GROUP_CHAT_ID_PREFIX, MS_IN_SECOND } from './constants'

/**
 * Превращает номер телефона в chatId личного чата GREEN-API.
 * @param {string} phone - Номер в международном виде, только цифры
 * @returns {string} chatId вида `79001234567@c.us`
 */
export const toChatId = (phone: string): string => `${phone}${CHAT_ID_PRIVATE_SUFFIX}`

/**
 * Проверяет, что chatId относится к группе или каналу (у них он начинается с «-»).
 * @param {string} chatId - chatId из уведомления
 * @returns {boolean} true для группы или канала
 */
export const isGroupChatId = (chatId: string): boolean => chatId.startsWith(GROUP_CHAT_ID_PREFIX)

/**
 * Убирает суффикс `@c.us`, если он есть.
 * @param {string} chatId - chatId вида `79001234567@c.us` или числовой `1472561111`
 * @returns {string} Номер телефона или числовой идентификатор
 */
export const fromChatId = (chatId: string): string => chatId.replace(CHAT_ID_PRIVATE_SUFFIX, '')

/**
 * Переводит время из ответа GREEN-API (секунды) в миллисекунды.
 * @param {number} seconds - Время в секундах, как его отдаёт API
 * @returns {number} Время в миллисекундах
 */
export const fromApiTimestamp = (seconds: number): number => seconds * MS_IN_SECOND
