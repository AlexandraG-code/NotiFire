import { type Page, expect, test } from '@playwright/test'

import { TEST_CREDENTIALS, TEST_PHONE, mockGreenApi } from './greenApiMock.ts'

/**
 * Входит в приложение с подменённым API.
 * @param {Page} page - Страница Playwright
 * @returns {Promise<string[]>} Вызванные методы API
 */
const login = async (page: Page) => {
	const calls = await mockGreenApi(page)
	await page.goto('/')
	await page.getByLabel('idInstance').fill(TEST_CREDENTIALS.idInstance)
	await page.getByLabel('apiTokenInstance').fill(TEST_CREDENTIALS.apiTokenInstance)
	await page.getByRole('button', { name: 'Войти' }).click()
	await expect(page.getByRole('heading', { name: 'Чаты' })).toBeVisible()
	return calls
}

test.describe('чат', () => {
	test('создаётся по номеру телефона и открывается', async ({ page }) => {
		await login(page)

		await page.getByRole('button', { name: 'Новый чат' }).click()
		await page.getByLabel('Номер телефона').fill('916 123-45-67')
		await page.getByRole('button', { name: 'Начать чат' }).click()

		await expect(page).toHaveURL(new RegExp(`#/chat/${TEST_PHONE}$`))
		await expect(page.getByRole('heading', { name: /Анна|\+7916/ })).toBeVisible()
		await expect(page.getByRole('link', { name: /Анна|\+7916/ })).toBeVisible()
	})

	test('отправленное сообщение появляется в чате', async ({ page }) => {
		const calls = await login(page)
		await page.getByRole('button', { name: 'Новый чат' }).click()
		await page.getByLabel('Номер телефона').fill('916 123-45-67')
		await page.getByRole('button', { name: 'Начать чат' }).click()

		await expect(page).toHaveURL(new RegExp(`#/chat/${TEST_PHONE}$`))
		await page.getByPlaceholder('Сообщение').fill('Привет из теста')
		await page.keyboard.press('Enter')

		// текст виден дважды: пузырь в диалоге и превью последнего сообщения в списке чатов
		await expect(page.getByText('Привет из теста')).toHaveCount(2)
		expect(calls).toContain('sendMessage')
	})

	test('фон чата с узором: файл узора загружается', async ({ page }) => {
		const pattern = page.waitForResponse((response) => /chat-pattern.*\.svg$/.test(response.url()))
		await login(page)

		// сервер на любой неизвестный адрес отвечает страницей index.html, поэтому проверяем и тип файла
		const response = await pattern
		expect(response.status()).toBe(200)
		expect(response.headers()['content-type']).toContain('image/svg')
	})

	test('аватар в списке чатов крупнее, чем в шапке диалога', async ({ page }) => {
		await login(page)
		await page.getByRole('button', { name: 'Новый чат' }).click()
		await page.getByLabel('Номер телефона').fill('916 123-45-67')
		await page.getByRole('button', { name: 'Начать чат' }).click()

		await expect(page.getByRole('link', { name: /Анна|\+7916/ }).locator('.ant-avatar')).toHaveCSS('width', '56px')
		await expect(page.locator('header .ant-avatar')).toHaveCSS('width', '40px')
	})

	test('после обновления страницы чат остаётся в списке', async ({ page }) => {
		await login(page)
		await page.getByRole('button', { name: 'Новый чат' }).click()
		await page.getByLabel('Номер телефона').fill('916 123-45-67')
		await page.getByRole('button', { name: 'Начать чат' }).click()
		await expect(page).toHaveURL(new RegExp(`#/chat/${TEST_PHONE}$`))

		await page.reload()

		await expect(page.getByRole('heading', { name: 'Чаты' })).toBeVisible()
		await expect(page.getByRole('link', { name: /Анна|\+7916/ })).toBeVisible()
	})
})
