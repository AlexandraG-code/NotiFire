import type { InstanceSettings } from '../api/types'

import { REQUIRED_SETTINGS } from './constants'
import { NotificationsStatus } from './enums'

/**
 * Проверяет, что у инстанса включены все уведомления, нужные приложению.
 * @param {InstanceSettings} settings - Настройки инстанса из getSettings
 * @returns {boolean} true, если ничего включать не нужно
 */
export const hasRequiredSettings = (settings: InstanceSettings): boolean =>
	(Object.keys(REQUIRED_SETTINGS) as (keyof InstanceSettings)[]).every(
		(key) => settings[key] === REQUIRED_SETTINGS[key]
	)

/**
 * Определяет состояние уведомлений по свежим настройкам. Пока настройки применяются, плашка «применяются» остаётся,
 * даже если GREEN-API ещё отдаёт старые значения: она сменится на «включены», когда настройки вступят в силу.
 * @param {InstanceSettings} settings - Настройки инстанса из getSettings
 * @param {NotificationsStatus} current - Текущее состояние
 * @returns {NotificationsStatus} Новое состояние
 */
export const resolveNotificationsStatus = (
	settings: InstanceSettings,
	current: NotificationsStatus
): NotificationsStatus => {
	if (hasRequiredSettings(settings)) {
		return NotificationsStatus.Enabled
	}
	return current === NotificationsStatus.Applying ? NotificationsStatus.Applying : NotificationsStatus.Disabled
}
