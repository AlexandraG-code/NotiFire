import { HttpMethod } from '@shared/api'
import { type GreenApiCredentials, callGreenApi } from '@shared/api/greenApi'

import { NotificationMethod } from './enums'
import type { DeleteNotificationResponse, ReceiveNotificationOptions, ReceiveNotificationResponse } from './types'

/**
 * Забирает из очереди одно уведомление методом receiveNotification (долгий опрос).
 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
 * @param {ReceiveNotificationOptions} options - Сколько секунд ждать уведомление и сигнал отмены
 * @returns {Promise<ReceiveNotificationResponse>} Уведомление или null, если очередь пуста
 */
export const receiveNotification = (
	creds: GreenApiCredentials,
	{ receiveTimeoutSeconds, signal }: ReceiveNotificationOptions
): Promise<ReceiveNotificationResponse> =>
	callGreenApi<ReceiveNotificationResponse>(creds, NotificationMethod.ReceiveNotification, {
		params: { receiveTimeout: receiveTimeoutSeconds },
		signal
	})

/**
 * Подтверждает получение уведомления методом deleteNotification: после этого оно уходит из очереди.
 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
 * @param {number} receiptId - Идентификатор уведомления из receiveNotification
 * @param {AbortSignal} [signal] - Сигнал отмены запроса
 * @returns {Promise<DeleteNotificationResponse>} Результат удаления
 */
export const deleteNotification = (
	creds: GreenApiCredentials,
	receiptId: number,
	signal?: AbortSignal
): Promise<DeleteNotificationResponse> =>
	callGreenApi<DeleteNotificationResponse>(creds, NotificationMethod.DeleteNotification, {
		httpMethod: HttpMethod.Delete,
		pathSuffix: receiptId,
		signal
	})
