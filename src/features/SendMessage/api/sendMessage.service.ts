import { HttpMethod } from '@shared/api'
import { type GreenApiCredentials, callGreenApi } from '@shared/api/greenApi'

import { SendMessageMethod } from './enums'
import type { SendMessageParams, SendMessageResponse } from './types'

/** Вызовы API отправки: только запросы, без проверок и сообщений пользователю. */
export const SendMessageService = {
	/**
	 * Отправляет текстовое сообщение методом sendMessage.
	 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
	 * @param {SendMessageParams} params - chatId получателя и текст
	 * @returns {Promise<SendMessageResponse>} Идентификатор отправленного сообщения
	 */
	async sendMessage(creds: GreenApiCredentials, params: SendMessageParams) {
		return callGreenApi<SendMessageResponse>(creds, SendMessageMethod.SendMessage, {
			httpMethod: HttpMethod.Post,
			data: params
		})
	}
}
