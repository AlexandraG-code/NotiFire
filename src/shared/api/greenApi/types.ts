import type { HttpMethod } from '../enums'

/** Учётные данные инстанса GREEN-API. */
export interface GreenApiCredentials {
	idInstance: string
	apiTokenInstance: string
}

export type RequestParams = Record<string, string | number>

/**
 * Параметры вызова метода GREEN-API.
 * @property {HttpMethod} [httpMethod] - HTTP-метод; по умолчанию GET
 * @property {unknown} [data] - Тело запроса
 * @property {RequestParams} [params] - Параметры строки запроса
 * @property {string | number} [pathSuffix] - Хвост пути после токена, например receiptId
 * @property {AbortSignal} [signal] - Сигнал отмены запроса
 */
export interface CallOptions {
	httpMethod?: HttpMethod
	data?: unknown
	params?: RequestParams
	pathSuffix?: string | number
	signal?: AbortSignal
}
