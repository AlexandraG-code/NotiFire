import { type GreenApiCredentials, callGreenApi } from '@shared/api/greenApi'

import { AuthMethod } from './enums'
import type { GetStateInstanceResponse } from './types'

/** Вызовы API авторизации */
export const AuthService = {
	/**
	 * Запрашивает состояние инстанса.
	 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
	 * @returns {Promise<GetStateInstanceResponse>} Ответ getStateInstance
	 */
	async getStateInstance(creds: GreenApiCredentials) {
		return callGreenApi<GetStateInstanceResponse>(creds, AuthMethod.GetStateInstance)
	}
}
