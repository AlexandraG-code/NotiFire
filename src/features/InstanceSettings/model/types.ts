import type { NotificationsStatus } from './enums'

/**
 * Свойства плашки о выключенных уведомлениях.
 * @property {NotificationsStatus} status - Состояние уведомлений инстанса
 * @property {boolean} isSaving - Идёт ли сохранение настроек
 * @property {Function} onEnable - Включает уведомления
 */
export interface NotificationsAlertProps {
	status: NotificationsStatus
	isSaving: boolean
	onEnable: () => void
}
