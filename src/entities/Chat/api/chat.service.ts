import { HttpMethod } from '@shared/api'
import { type GreenApiCredentials, callGreenApi } from '@shared/api/greenApi'

import { ChatMethod } from './enums'
import type { ContactInfo } from './types'

/** Вызовы API по чату: только запросы, без проверок и сообщений пользователю. */
export const ChatService = {
	/**
	 * Запрашивает профиль собеседника методом getContactInfo.
	 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
	 * @param {string} chatId - chatId чата
	 * @returns {Promise<ContactInfo>} Имя, аватар и настоящий chatId собеседника
	 */
	async getContactInfo(creds: GreenApiCredentials, chatId: string) {
		return callGreenApi<ContactInfo>(creds, ChatMethod.GetContactInfo, {
			httpMethod: HttpMethod.Post,
			data: { chatId }
		})
	}
}
