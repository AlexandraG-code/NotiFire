import { AxiosInstance } from '../axios.config'
import { HttpMethod } from '../enums'

import { GreenApiMethod } from './enums'
import type {
	CallOptions,
	DeleteNotificationResponse,
	GetStateInstanceResponse,
	GreenApiCredentials,
	ReceiveNotificationOptions,
	ReceiveNotificationResponse,
	SendMessageParams,
	SendMessageResponse
} from './types'
import { buildMethodUrl } from './url'

/**
 * Вызывает метод GREEN-API и возвращает тело ответа.
 * @param {GreenApiCredentials} creds - Данные инстанса
 * @param {GreenApiMethod} method - Вызываемый метод
 * @param {CallOptions} [options] - HTTP-метод, тело, параметры запроса и сигнал отмены
 * @returns {Promise<T>} Тело ответа
 */
const call = async <T>(creds: GreenApiCredentials, method: GreenApiMethod, options: CallOptions = {}): Promise<T> => {
	const { httpMethod = HttpMethod.Get, data, params, pathSuffix, signal } = options
	const response = await AxiosInstance.request<T>({
		url: buildMethodUrl(creds, method, pathSuffix),
		method: httpMethod,
		data,
		params,
		signal
	})
	return response.data
}

/** Сервис GREEN-API; креды передаются аргументом, глобального состояния нет. */
export const greenApi = {
	getStateInstance: (creds: GreenApiCredentials) =>
		call<GetStateInstanceResponse>(creds, GreenApiMethod.GetStateInstance),

	sendMessage: (creds: GreenApiCredentials, params: SendMessageParams) =>
		call<SendMessageResponse>(creds, GreenApiMethod.SendMessage, { httpMethod: HttpMethod.Post, data: params }),

	receiveNotification: (creds: GreenApiCredentials, { receiveTimeoutSeconds, signal }: ReceiveNotificationOptions) =>
		call<ReceiveNotificationResponse>(creds, GreenApiMethod.ReceiveNotification, {
			params: { receiveTimeout: receiveTimeoutSeconds },
			signal
		}),

	deleteNotification: (creds: GreenApiCredentials, receiptId: number, signal?: AbortSignal) =>
		call<DeleteNotificationResponse>(creds, GreenApiMethod.DeleteNotification, {
			httpMethod: HttpMethod.Delete,
			pathSuffix: receiptId,
			signal
		})
}
