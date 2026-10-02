import { useEffect } from 'react'

import type { GreenApiCredentials } from '@shared/api/greenApi'

import { pollNotifications } from './pollNotifications'

/**
 * Хук фонового получения уведомлений: долгий опрос receiveNotification, затем deleteNotification.
 * Работает, пока смонтирован компонент и заданы креды; при ошибке повторяет опрос после паузы.
 * @param {GreenApiCredentials | null} credentials - Данные инстанса GREEN-API; при null опрос не идёт
 * @returns {void}
 */
export const useNotificationPolling = (credentials: GreenApiCredentials | null): void => {
	const idInstance = credentials?.idInstance
	const apiTokenInstance = credentials?.apiTokenInstance

	useEffect(() => {
		if (!idInstance || !apiTokenInstance) {
			return
		}

		const controller = new AbortController()
		void pollNotifications({ idInstance, apiTokenInstance }, controller.signal)

		return () => controller.abort()
	}, [idInstance, apiTokenInstance])
}
