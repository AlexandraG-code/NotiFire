import { WebhookState } from '../api/enums'
import type { InstanceSettings } from '../api/types'

import { NotificationsStatus } from './enums'
import { resolveNotificationsStatus } from './instanceSettings.helpers'

const allOn: InstanceSettings = {
	incomingWebhook: WebhookState.Yes,
	outgoingMessageWebhook: WebhookState.Yes,
	outgoingAPIMessageWebhook: WebhookState.Yes
}
const incomingOff: InstanceSettings = { ...allOn, incomingWebhook: WebhookState.No }

describe('resolveNotificationsStatus', () => {
	it('включены, если все нужные уведомления включены', () => {
		expect(resolveNotificationsStatus(allOn, NotificationsStatus.Unknown)).toBe(NotificationsStatus.Enabled)
		expect(resolveNotificationsStatus(allOn, NotificationsStatus.Applying)).toBe(NotificationsStatus.Enabled)
	})

	it('выключены, если хотя бы одно нужное уведомление выключено', () => {
		expect(resolveNotificationsStatus(incomingOff, NotificationsStatus.Unknown)).toBe(NotificationsStatus.Disabled)
	})

	it('пока настройки применяются, не откатывается к «выключены»', () => {
		expect(resolveNotificationsStatus(incomingOff, NotificationsStatus.Applying)).toBe(NotificationsStatus.Applying)
	})
})
