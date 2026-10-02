import { useEffect } from 'react'

import type { GreenApiCredentials } from '@shared/api/greenApi'
import { sleep } from '@shared/lib'

import { deleteNotification, receiveNotification } from '../api/notifications.service'

import { RECEIVE_TIMEOUT_SECONDS, RETRY_DELAY_MS } from './constants'
import { handleNotification } from './handleNotification'

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

		const creds = { idInstance, apiTokenInstance }
		const controller = new AbortController()
		const { signal } = controller

		const poll = async () => {
			while (!signal.aborted) {
				try {
					const notification = await receiveNotification(creds, {
						receiveTimeoutSeconds: RECEIVE_TIMEOUT_SECONDS,
						signal
					})

					if (!notification) {
						continue
					}

					handleNotification(notification.body)
					await deleteNotification(creds, notification.receiptId, signal)
				} catch {
					await sleep(RETRY_DELAY_MS, signal)
				}
			}
		}

		void poll()
		return () => controller.abort()
	}, [idInstance, apiTokenInstance])
}
