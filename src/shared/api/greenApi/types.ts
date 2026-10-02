import type { HttpMethod } from '../enums'

/** Учётные данные инстанса GREEN-API. */
export interface GreenApiCredentials {
	idInstance: string
	apiTokenInstance: string
}

export type RequestParams = Record<string, string | number>

/** Параметры вызова метода GREEN-API. */
export interface CallOptions {
	httpMethod?: HttpMethod
	data?: unknown
	params?: RequestParams
	/** Хвост пути после токена, например receiptId. */
	pathSuffix?: string | number
	signal?: AbortSignal
}
