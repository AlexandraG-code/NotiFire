import type { WebhookState } from './enums'

/**
 * Настройки инстанса, нужные приложению для получения сообщений (остальные поля ответа не используются).
 * @property {WebhookState} incomingWebhook - Уведомления о входящих сообщениях
 * @property {WebhookState} outgoingMessageWebhook - Уведомления об исходящих сообщениях, отправленных с телефона
 * @property {WebhookState} outgoingAPIMessageWebhook - Уведомления об исходящих сообщениях, отправленных через API
 */
export interface InstanceSettings {
	incomingWebhook: WebhookState
	outgoingMessageWebhook: WebhookState
	outgoingAPIMessageWebhook: WebhookState
}

/**
 * Ответ setSettings.
 * @property {boolean} saveSettings - Приняты ли настройки (применяются в течение нескольких минут)
 */
export interface SetSettingsResponse {
	saveSettings: boolean
}
