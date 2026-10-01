import type { GreenApiMethod } from './enums'
import type { GreenApiCredentials } from './types'

const SHARD_PLACEHOLDER = '{shard}'
const SHARD_LENGTH = 4
const INSTANCE_PREFIX = 'waInstance'

/**
 * Хост API инстанса: шаблон из env-config, `{shard}` заменяется первыми цифрами idInstance.
 * @param {string} idInstance - Идентификатор инстанса
 * @returns {string} Базовый адрес API
 */
export const getApiUrl = (idInstance: string): string =>
	window._env_.GREEN_API_URL_TEMPLATE.replace(SHARD_PLACEHOLDER, idInstance.slice(0, SHARD_LENGTH))

/**
 * Полный URL метода: `{host}/waInstance{id}/{method}/{token}[/{suffix}]`.
 * @param {GreenApiCredentials} creds - Данные инстанса GREEN-API
 * @param {GreenApiMethod} method - Вызываемый метод
 * @param {string | number} [pathSuffix] - Дополнительный сегмент пути, например receiptId
 * @returns {string} Адрес запроса
 */
export const buildMethodUrl = (
	{ idInstance, apiTokenInstance }: GreenApiCredentials,
	method: GreenApiMethod,
	pathSuffix?: string | number
): string => {
	const base = `${getApiUrl(idInstance)}/${INSTANCE_PREFIX}${idInstance}/${method}/${apiTokenInstance}`
	return pathSuffix === undefined ? base : `${base}/${pathSuffix}`
}
