import type { Chat } from '../model/types'

/**
 * Ищет чат по chatId из GREEN-API: основному или любому из дополнительных.
 * @param {Chat[]} chats - Список чатов
 * @param {string} apiChatId - chatId из уведомления
 * @returns {Chat | undefined} Найденный чат или undefined
 */
export const findChatByApiId = (chats: Chat[], apiChatId: string): Chat | undefined =>
	chats.find((chat) => chat.apiChatId === apiChatId || chat.aliases.includes(apiChatId))
