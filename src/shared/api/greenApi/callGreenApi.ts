import { AxiosInstance } from '../axios.config'
import { HttpMethod } from '../enums'

import type { CallOptions, GreenApiCredentials } from './types'
import { buildMethodUrl } from './url'

/**
 * Вызывает метод GREEN-API и возвращает тело ответа. Общий клиент: конкретные методы описаны в слайсах,
 * которые ими пользуются.
 * @param {GreenApiCredentials} creds - Данные инстанса
 * @param {string} method - Имя метода из enum слайса, например `sendMessage`
 * @param {CallOptions} [options] - HTTP-метод, тело, параметры запроса, хвост пути и сигнал отмены
 * @returns {Promise<T>} Тело ответа
 */
export const callGreenApi = async <T>(
	creds: GreenApiCredentials,
	method: string,
	options: CallOptions = {}
): Promise<T> => {
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
