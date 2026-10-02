import type { HistoryMessageType } from './enums'

/**
 * Параметры метода getChatHistory.
 * @property {string} chatId - Идентификатор чата: числовой или номер с суффиксом @c.us
 * @property {number} [count] - Сколько последних сообщений вернуть; без значения сервис отдаёт 100
 */
export interface GetChatHistoryParams {
	chatId: string
	count?: number
}

/**
 * Сообщение из журнала чата (getChatHistory).
 * @property {HistoryMessageType} type - Направление: входящее или исходящее
 * @property {string} idMessage - Идентификатор сообщения в GREEN-API
 * @property {number} timestamp - Время в секундах
 * @property {string} typeMessage - Тип сообщения; у нетекстовых (медиа и т.п.) текста нет
 * @property {string} chatId - Идентификатор чата
 * @property {string | null} [senderName] - Имя отправителя (у входящих)
 * @property {string | null} [textMessage] - Текст сообщения
 */
export interface HistoryMessage {
	type: HistoryMessageType
	idMessage: string
	timestamp: number
	typeMessage: string
	chatId: string
	senderName?: string | null
	textMessage?: string | null
}
