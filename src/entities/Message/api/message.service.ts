import { HttpMethod } from '@shared/api'
import { type GreenApiCredentials, callGreenApi } from '@shared/api/greenApi'

import { MessageMethod } from './enums'
import type { GetChatHistoryParams, HistoryMessage } from './types'

/** Вызовы API по сообщениям: только запросы, без проверок и сообщений пользователю. */
export const MessageService = {
	/**
	 * Запрашивает последние сообщения чата методом getChatHistory (хранится до 3 месяцев).
	 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
	 * @param {GetChatHistoryParams} params - chatId чата и сколько сообщений вернуть
	 * @returns {Promise<HistoryMessage[]>} Сообщения от новых к старым
	 */
	async getChatHistory(creds: GreenApiCredentials, params: GetChatHistoryParams) {
		return callGreenApi<HistoryMessage[]>(creds, MessageMethod.GetChatHistory, {
			httpMethod: HttpMethod.Post,
			data: params
		})
	}
}
