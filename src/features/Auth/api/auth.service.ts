import { isAxiosError } from 'axios'

import { HttpStatus } from '@shared/api'
import { type GreenApiCredentials, callGreenApi } from '@shared/api/greenApi'

import { AuthMethod, StateInstance } from './enums'
import type { GetStateInstanceResponse } from './types'

const INVALID_CREDENTIALS_STATUSES: number[] = [
	HttpStatus.BadRequest,
	HttpStatus.Unauthorized,
	HttpStatus.Forbidden,
	HttpStatus.NotFound
]

/**
 * Запрашивает состояние инстанса.
 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
 * @returns {Promise<GetStateInstanceResponse>} Ответ getStateInstance
 */
const getStateInstance = (creds: GreenApiCredentials): Promise<GetStateInstanceResponse> =>
	callGreenApi<GetStateInstanceResponse>(creds, AuthMethod.GetStateInstance)

/**
 * Подбирает текст для пользователя по ошибке запроса.
 * @param {unknown} error - Ошибка из catch
 * @returns {string} «Неверные данные» для статусов отказа, иначе «Нет связи»
 */
const getErrorMessage = (error: unknown): string =>
	isAxiosError(error) && error.response && INVALID_CREDENTIALS_STATUSES.includes(error.response.status)
		? 'Неверный idInstance или apiTokenInstance'
		: 'Не удалось связаться с GREEN-API'

/**
 * Проверяет креды запросом getStateInstance.
 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
 * @returns {Promise<void>} Разрешается, если инстанс авторизован
 * @throws {Error} Если данные неверны, инстанс не авторизован или нет связи с API; message пригоден для показа
 */
export const verifyCredentials = async (creds: GreenApiCredentials): Promise<void> => {
	const { stateInstance } = await getStateInstance(creds).catch((error: unknown) => {
		throw new Error(getErrorMessage(error), { cause: error })
	})

	if (stateInstance !== StateInstance.Authorized) {
		throw new Error(`Инстанс не авторизован (состояние: ${stateInstance})`)
	}
}
