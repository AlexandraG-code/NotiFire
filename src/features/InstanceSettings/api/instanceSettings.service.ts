import { HttpMethod } from '@shared/api'
import { type GreenApiCredentials, callGreenApi } from '@shared/api/greenApi'

import { SettingsMethod } from './enums'
import type { InstanceSettings, SetSettingsResponse } from './types'

/** Вызовы API настроек инстанса: только запросы, без проверок и сообщений пользователю. */
export const InstanceSettingsService = {
	/**
	 * Запрашивает текущие настройки инстанса.
	 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
	 * @returns {Promise<InstanceSettings>} Ответ getSettings
	 */
	async getSettings(creds: GreenApiCredentials) {
		return callGreenApi<InstanceSettings>(creds, SettingsMethod.GetSettings)
	},

	/**
	 * Меняет настройки инстанса; изменённые поля применяются в течение нескольких минут.
	 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
	 * @param {Partial<InstanceSettings>} settings - Поля, которые нужно изменить
	 * @returns {Promise<SetSettingsResponse>} Ответ setSettings
	 */
	async setSettings(creds: GreenApiCredentials, settings: Partial<InstanceSettings>) {
		return callGreenApi<SetSettingsResponse>(creds, SettingsMethod.SetSettings, {
			httpMethod: HttpMethod.Post,
			data: settings
		})
	}
}
