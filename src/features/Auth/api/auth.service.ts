import { isAxiosError } from 'axios'

import { HttpStatus } from '@shared/api'
import { type GreenApiCredentials, StateInstance, greenApi } from '@shared/api/greenApi'

import { AuthError } from './auth.errors'

const INVALID_CREDENTIALS_STATUSES: number[] = [
	HttpStatus.BadRequest,
	HttpStatus.Unauthorized,
	HttpStatus.Forbidden,
	HttpStatus.NotFound
]

/**
 * Проверяет креды запросом getStateInstance.
 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
 * @returns {Promise<void>} Разрешается, если инстанс авторизован
 * @throws {AuthError} Если данные неверны, инстанс не авторизован или нет связи с API
 */
export const verifyCredentials = async (creds: GreenApiCredentials): Promise<void> => {
	try {
		const { stateInstance } = await greenApi.getStateInstance(creds)
		if (stateInstance !== StateInstance.Authorized) {
			throw new AuthError(`Инстанс не авторизован (состояние: ${stateInstance})`)
		}
	} catch (error) {
		if (error instanceof AuthError) throw error
		if (isAxiosError(error) && error.response && INVALID_CREDENTIALS_STATUSES.includes(error.response.status)) {
			throw new AuthError('Неверный idInstance или apiTokenInstance')
		}
		throw new AuthError('Не удалось связаться с GREEN-API')
	}
}
