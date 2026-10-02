import { create } from 'zustand'

import type { GreenApiCredentials } from '@shared/api/greenApi'
import { Namespace, i18n } from '@shared/i18n'
import { runAsyncAction } from '@shared/lib'

import { InstanceSettingsService } from '../api/instanceSettings.service'

import { REQUIRED_SETTINGS } from './constants'
import { NotificationsStatus } from './enums'
import { hasRequiredSettings } from './instanceSettings.helpers'

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
		const isChecked = await runAsyncAction(
			async () => {
				const settings = await InstanceSettingsService.getSettings(credentials)
				if (hasRequiredSettings(settings)) {
					set({ status: NotificationsStatus.Enabled })
				} else if (get().status !== NotificationsStatus.Applying) {
					set({ status: NotificationsStatus.Disabled })
				}
			},
			// проверка — подсказка, а не действие пользователя: при сбое (в том числе 429 от лимитов API) плашки просто нет
			{ errorTitle: i18n.t('notifications.checkFailed', { ns: Namespace.Chat }), silent: true }
		)
		set({ isChecking: false })
		return isChecked
	},
	enable: async (credentials) => {
		set({ isSaving: true })
		const isSaved = await runAsyncAction(
			async () => {
				const { saveSettings } = await InstanceSettingsService.setSettings(credentials, REQUIRED_SETTINGS)
				if (!saveSettings) {
					throw new Error(i18n.t('notifications.notSaved', { ns: Namespace.Chat }))
				}
				set({ status: NotificationsStatus.Applying })
			},
			{ errorTitle: i18n.t('notifications.enableFailed', { ns: Namespace.Chat }) }
		)
		set({ isSaving: false })
		return isSaved
	}
}))
