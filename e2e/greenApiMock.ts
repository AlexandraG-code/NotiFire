import type { Page } from '@playwright/test'

/** Данные, которыми тесты входят в приложение: придуманные, настоящий инстанс не нужен. */
export const TEST_CREDENTIALS = { idInstance: '1234567890', apiTokenInstance: 'test-token' }

/** Номер собеседника в международном виде без плюса. */
export const TEST_PHONE = '79161234567'

const RECEIVE_NOTIFICATION_DELAY_MS = 1000

/**
 * Подменяет GREEN-API в браузере: приложение работает как с живым инстансом, но запросы никуда не уходят.
 * @param {Page} page - Страница Playwright
 * @returns {Promise<string[]>} Список вызванных методов API по порядку (для проверок в тесте)
 */
export const mockGreenApi = async (page: Page): Promise<string[]> => {
	const calls: string[] = []

	await page.route('https://*.api.green-api.com/**', async (route) => {
		const method = new URL(route.request().url()).pathname.split('/')[2]
		calls.push(method)

		const responses: Record<string, unknown> = {
			getStateInstance: { stateInstance: 'authorized' },
			getSettings: {
				incomingWebhook: 'yes',
				outgoingMessageWebhook: 'yes',
				outgoingAPIMessageWebhook: 'yes'
			},
			getContactInfo: { chatId: `${TEST_PHONE}@c.us`, name: 'Анна', avatar: '' },
			getChatHistory: [],
			sendMessage: { idMessage: 'message-1' }
		}

		// очередь уведомлений пуста: настоящий сервер держит такой запрос несколько секунд
		if (method === 'receiveNotification') {
			await new Promise((resolve) => setTimeout(resolve, RECEIVE_NOTIFICATION_DELAY_MS))
			await route.fulfill({ json: null })
			return
		}

		await route.fulfill({ json: responses[method] ?? {} })
	})

	return calls
}

/**
 * Заставляет getStateInstance отвечать отказом, как при неверных данных инстанса.
 * @param {Page} page - Страница Playwright
 * @returns {Promise<void>} Разрешается, когда ответ подменён
 */
export const rejectCredentials = async (page: Page): Promise<void> => {
	await page.route('https://*.api.green-api.com/**/getStateInstance/**', (route) =>
		route.fulfill({ status: 401, json: { message: 'Unauthorized' } })
	)
}
