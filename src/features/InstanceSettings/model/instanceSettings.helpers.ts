import type { InstanceSettings } from '../api/types'

import { REQUIRED_SETTINGS } from './constants'

/**
 * Проверяет, что у инстанса включены все уведомления, нужные приложению.
 * @param {InstanceSettings} settings - Настройки инстанса из getSettings
 * @returns {boolean} true, если ничего включать не нужно
 */
export const hasRequiredSettings = (settings: InstanceSettings): boolean =>
	(Object.keys(REQUIRED_SETTINGS) as (keyof InstanceSettings)[]).every(
		(key) => settings[key] === REQUIRED_SETTINGS[key]
	)
