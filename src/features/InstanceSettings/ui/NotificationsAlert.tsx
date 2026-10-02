import { Alert, Button, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

import { Namespace } from '@shared/i18n'

import { NotificationsStatus } from '../model/enums'
import type { NotificationsAlertProps } from '../model/types'

import styles from './NotificationsAlert.module.scss'

/**
 * Плашка над чатом: предупреждает, что у инстанса выключены уведомления и ответы не придут, и предлагает включить их;
 * пока настройки применяются, в ней крутится спиннер.
 * @param {NotificationsStatus} status - Состояние уведомлений инстанса
 * @param {boolean} isSaving - Идёт ли сохранение настроек
 * @param {Function} onEnable - Включает уведомления
 * @returns {JSX.Element | null} Плашка или null, если всё в порядке
 */
export const NotificationsAlert = ({ status, isSaving, onEnable }: NotificationsAlertProps) => {
	const { t } = useTranslation(Namespace.Chat)

	if (status === NotificationsStatus.Disabled) {
		return (
			<Alert
				className={styles.alert}
				type="warning"
				banner
				message={t('notifications.disabled')}
				action={
					<Button size="small" type="primary" loading={isSaving} onClick={onEnable}>
						{t('notifications.enable')}
					</Button>
				}
			/>
		)
	}

	if (status === NotificationsStatus.Applying) {
		return (
			<Alert
				className={styles.alert}
				type="info"
				banner
				showIcon
				icon={<Spin size="small" />}
				message={t('notifications.applying')}
			/>
		)
	}

	return null
}
