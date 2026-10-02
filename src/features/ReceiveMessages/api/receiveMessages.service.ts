import { HttpMethod } from '@shared/api'
import { type GreenApiCredentials, callGreenApi } from '@shared/api/greenApi'

import { NotificationMethod } from './enums'
import type { DeleteNotificationResponse, ReceiveNotificationOptions, ReceiveNotificationResponse } from './types'

/** Вызовы API получения сообщений: только запросы, без разбора уведомлений и сообщений пользователю. */
export const ReceiveMessagesService = {
	/**
	 * Забирает из очереди одно уведомление методом receiveNotification (долгий опрос).
	 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
	 * @param {ReceiveNotificationOptions} options - Сколько секунд ждать уведомление и сигнал отмены
	 * @returns {Promise<ReceiveNotificationResponse>} Уведомление или null, если очередь пуста
	 */
	async receiveNotification(
		creds: GreenApiCredentials,
		{ receiveTimeoutSeconds, signal }: ReceiveNotificationOptions
	) {
		return callGreenApi<ReceiveNotificationResponse>(creds, NotificationMethod.ReceiveNotification, {
			params: { receiveTimeout: receiveTimeoutSeconds },
			signal
		})
	},

	/**
	 * Подтверждает получение уведомления методом deleteNotification: после этого оно уходит из очереди.
	 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
	 * @param {number} receiptId - Идентификатор уведомления из receiveNotification
	 * @param {AbortSignal} [signal] - Сигнал отмены запроса
	 * @returns {Promise<DeleteNotificationResponse>} Результат удаления
	 */
	async deleteNotification(creds: GreenApiCredentials, receiptId: number, signal?: AbortSignal) {
		return callGreenApi<DeleteNotificationResponse>(creds, NotificationMethod.DeleteNotification, {
			httpMethod: HttpMethod.Delete,
			pathSuffix: receiptId,
			signal
		})
	}
}
