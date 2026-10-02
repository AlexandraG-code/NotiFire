import type { GreenApiCredentials } from '@shared/api/greenApi'
import { sleep } from '@shared/lib'

import { ReceiveMessagesService } from '../api/receiveMessages.service'

import { RECEIVE_TIMEOUT_SECONDS, RETRY_DELAY_MS } from './constants'
import { handleNotification } from './handleNotification'

/**
 * Опрашивает очередь уведомлений, пока не отменён сигнал: получает уведомление, обрабатывает и подтверждает
 * его удалением. При ошибке делает паузу и продолжает.
 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
 * @param {AbortSignal} signal - Сигнал остановки опроса
 * @returns {Promise<void>} Завершается после отмены сигнала
 */
export const pollNotifications = async (creds: GreenApiCredentials, signal: AbortSignal): Promise<void> => {
	while (!signal.aborted) {
		try {
			const notification = await ReceiveMessagesService.receiveNotification(creds, {
				receiveTimeoutSeconds: RECEIVE_TIMEOUT_SECONDS,
				signal
			})

			if (!notification) {
				continue
			}

			handleNotification(notification.body)
			await ReceiveMessagesService.deleteNotification(creds, notification.receiptId, signal)
		} catch {
			await sleep(RETRY_DELAY_MS, signal)
		}
	}
}
