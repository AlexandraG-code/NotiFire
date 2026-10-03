import { create } from 'zustand'

import type { GreenApiCredentials } from '@shared/api/greenApi'
import { Namespace, i18n } from '@shared/i18n'
import { runAsyncAction } from '@shared/lib'

import { InstanceSettingsService } from '../api/instanceSettings.service'

import { REQUIRED_SETTINGS } from './constants'
import { NotificationsStatus } from './enums'
import { resolveNotificationsStatus } from './instanceSettings.helpers'

interface InstanceSettingsState {
	status: NotificationsStatus
	isSaving: boolean
	isChecking: boolean
}

/**
 * Действия стора настроек инстанса.
 * @property {Function} check - Читает настройки и определяет, включены ли нужные уведомления; пока они применяются,
 * плашка остаётся, а когда настройки вступили в силу, исчезает
 * @property {Function} enable - Включает нужные уведомления; они начинают работать через несколько минут
 */
interface InstanceSettingsActions {
	check: (credentials: GreenApiCredentials) => Promise<boolean>
	enable: (credentials: GreenApiCredentials) => Promise<boolean>
}

/** Стор настроек инстанса: нужен, чтобы предупредить о выключенных уведомлениях и включить их. */
export const useInstanceSettingsStore = create<InstanceSettingsState & InstanceSettingsActions>()((set, get) => ({
	status: NotificationsStatus.Unknown,
	isSaving: false,
	isChecking: false,
	check: async (credentials) => {
		// повторный вызов, пока идёт запрос (двойной запуск эффекта, быстрый возврат на страницу), лимиты API не расходует
		if (get().isChecking) {
			return false
		}

		set({ isChecking: true })
		const { isSuccess, data: settings } = await runAsyncAction(
			() => InstanceSettingsService.getSettings(credentials),
			// проверка — подсказка, а не действие пользователя: при сбое (в том числе 429 от лимитов API) плашки просто нет
			{ errorTitle: i18n.t('notifications.checkFailed', { ns: Namespace.Chat }), silent: true }
		)

		if (isSuccess) {
			set({ status: resolveNotificationsStatus(settings, get().status) })
		}
		set({ isChecking: false })
		return isSuccess
	},
	enable: async (credentials) => {
		set({ isSaving: true })
		const { isSuccess } = await runAsyncAction(
			async () => {
				const { saveSettings } = await InstanceSettingsService.setSettings(credentials, REQUIRED_SETTINGS)
				if (!saveSettings) {
					throw new Error(i18n.t('notifications.notSaved', { ns: Namespace.Chat }))
				}
			},
			{ errorTitle: i18n.t('notifications.enableFailed', { ns: Namespace.Chat }) }
		)

		if (isSuccess) {
			set({ status: NotificationsStatus.Applying })
		}
		set({ isSaving: false })
		return isSuccess
	}
}))
