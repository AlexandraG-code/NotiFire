import type { HttpMethod } from '../enums'

import type { StateInstance, TypeMessage, TypeWebhook } from './enums'

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

export interface GetStateInstanceResponse {
	stateInstance: StateInstance
}

export interface SendMessageParams {
	chatId: string
	message: string
}

export interface SendMessageResponse {
	idMessage: string
}

export interface ReceiveNotificationOptions {
	receiveTimeoutSeconds: number
	signal?: AbortSignal
}

export interface NotificationSenderData {
	chatId: string
	sender: string
	senderName?: string
}

export interface TextMessageData {
	textMessage: string
}

export interface ExtendedTextMessageData {
	text: string
}

export interface NotificationMessageData {
	typeMessage: TypeMessage
	textMessageData?: TextMessageData
	extendedTextMessageData?: ExtendedTextMessageData
}

/** Тело уведомления; у служебных типов (смена состояния и др.) нет отправителя и сообщения. */
export interface NotificationBody {
	typeWebhook: TypeWebhook | string
	timestamp?: number
	idMessage?: string
	senderData?: NotificationSenderData
	messageData?: NotificationMessageData
}

export interface Notification {
	receiptId: number
	body: NotificationBody
}

/** Ответ receiveNotification: null, если очередь пуста. */
export type ReceiveNotificationResponse = Notification | null

export interface DeleteNotificationResponse {
	result: boolean
}
