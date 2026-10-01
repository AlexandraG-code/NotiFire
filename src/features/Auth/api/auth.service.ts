import { isAxiosError } from 'axios'

import { HttpStatus } from '@shared/api'
import { type GreenApiCredentials, StateInstance, greenApi } from '@shared/api/greenApi'

const INVALID_CREDENTIALS_STATUSES: number[] = [
	HttpStatus.BadRequest,
	HttpStatus.Unauthorized,
	HttpStatus.Forbidden,
	HttpStatus.NotFound
]

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
	const { stateInstance } = await greenApi.getStateInstance(creds).catch((error: unknown) => {
		throw new Error(getErrorMessage(error), { cause: error })
	})

	if (stateInstance !== StateInstance.Authorized) {
		throw new Error(`Инстанс не авторизован (состояние: ${stateInstance})`)
	}
}
