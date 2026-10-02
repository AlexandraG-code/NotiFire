import { WebhookState } from '../api/enums'
import type { InstanceSettings } from '../api/types'

/** Как часто перечитывать настройки, пока включённые уведомления применяются (GREEN-API делает это не сразу). */
export const APPLY_CHECK_INTERVAL_MS = 15_000

/** Настройки, без которых приложение не получает ответы: все три типа уведомлений должны быть включены. */
export const REQUIRED_SETTINGS: InstanceSettings = {
	incomingWebhook: WebhookState.Yes,
	outgoingMessageWebhook: WebhookState.Yes,
	outgoingAPIMessageWebhook: WebhookState.Yes
}
