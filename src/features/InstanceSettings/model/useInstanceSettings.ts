import { useCallback, useEffect } from 'react'

import type { GreenApiCredentials } from '@shared/api/greenApi'

import { APPLY_CHECK_INTERVAL_MS } from './constants'
import { NotificationsStatus } from './enums'
import { useInstanceSettingsStore } from './useInstanceSettingsStore'

/**
 * Хук проверки уведомлений инстанса: при входе читает настройки, даёт состояние и действие «включить».
 * @param {GreenApiCredentials | null} credentials - Данные инстанса GREEN-API; при null проверка не идёт
 * @returns {object} `status` — состояние уведомлений, `isSaving` — идёт ли сохранение, `enable` — включить уведомления
 */
export const useInstanceSettings = (credentials: GreenApiCredentials | null) => {
	const status = useInstanceSettingsStore((state) => state.status)
	const isSaving = useInstanceSettingsStore((state) => state.isSaving)
	const check = useInstanceSettingsStore((state) => state.check)
	const enableNotifications = useInstanceSettingsStore((state) => state.enable)

	const enable = useCallback(() => {
		if (credentials) {
			void enableNotifications(credentials)
		}
	}, [credentials, enableNotifications])

	useEffect(() => {
		if (credentials) {
			void check(credentials)
		}
	}, [credentials, check])

	useEffect(() => {
		if (!credentials || status !== NotificationsStatus.Applying) {
			return
		}

		const timer = setInterval(() => void check(credentials), APPLY_CHECK_INTERVAL_MS)

		return () => clearInterval(timer)
	}, [credentials, status, check])

	return { status, isSaving, enable }
}
