import { expect, test } from '@playwright/test'

import { TEST_CREDENTIALS, mockGreenApi } from './greenApiMock.ts'

test.describe('поле ввода сообщения', () => {
	test('однострочный текст стоит по центру плавающего поля, на уровне кнопки отправки', async ({ page }) => {
		await mockGreenApi(page)
		await page.goto('/')
		await page.getByLabel('idInstance').fill(TEST_CREDENTIALS.idInstance)
		await page.getByLabel('apiTokenInstance').fill(TEST_CREDENTIALS.apiTokenInstance)
		await page.getByRole('button', { name: 'Войти' }).click()
		await page.getByRole('button', { name: 'Новый чат' }).click()
		await page.getByLabel('Номер телефона').fill('916 123-45-67')
		await page.getByRole('button', { name: 'Начать чат' }).click()

		const field = await page.getByPlaceholder('Сообщение').boundingBox()
		const button = await page.getByRole('button', { name: 'Отправить' }).boundingBox()

		expect(field).not.toBeNull()
		expect(button).not.toBeNull()
		const fieldCenter = field!.y + field!.height / 2
		const buttonCenter = button!.y + button!.height / 2
		// допуск в 1 px на округление: текст не должен «висеть» ниже кнопки
		expect(Math.abs(fieldCenter - buttonCenter)).toBeLessThanOrEqual(1)
	})
})
