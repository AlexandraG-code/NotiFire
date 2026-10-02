import { expect, test } from '@playwright/test'

import { TEST_CREDENTIALS, mockGreenApi, rejectCredentials } from './greenApiMock.ts'

test.describe('вход', () => {
	test('с верными данными открывает приложение', async ({ page }) => {
		const calls = await mockGreenApi(page)
		await page.goto('/')

		await page.getByLabel('idInstance').fill(TEST_CREDENTIALS.idInstance)
		await page.getByLabel('apiTokenInstance').fill(TEST_CREDENTIALS.apiTokenInstance)
		await page.getByRole('button', { name: 'Войти' }).click()

		await expect(page.getByRole('heading', { name: 'Чаты' })).toBeVisible()
		expect(calls).toContain('getStateInstance')
	})

	test('с неверными данными остаётся на форме и показывает ошибку', async ({ page }) => {
		await rejectCredentials(page)
		await page.goto('/')

		await page.getByLabel('idInstance').fill(TEST_CREDENTIALS.idInstance)
		await page.getByLabel('apiTokenInstance').fill('wrong')
		await page.getByRole('button', { name: 'Войти' }).click()

		await expect(page.getByText('Неверный idInstance или apiTokenInstance')).toBeVisible()
		await expect(page.getByRole('button', { name: 'Войти' })).toBeVisible()
	})

	test('без входа закрытая страница ведёт на форму входа', async ({ page }) => {
		await page.goto('/#/chat/79161234567')

		await expect(page.getByRole('button', { name: 'Войти' })).toBeVisible()
	})
})
