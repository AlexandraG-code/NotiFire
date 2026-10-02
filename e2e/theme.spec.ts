import { expect, test } from '@playwright/test'

test.describe('тема и оформление', () => {
	test.use({ colorScheme: 'light' })

	test('переключается на тёмную и запоминается после обновления', async ({ page }) => {
		await page.goto('/')
		const html = page.locator('html')
		await expect(html).toHaveAttribute('data-theme', 'light')

		await page.getByRole('button', { name: 'Включить тёмную тему' }).click()
		await expect(html).toHaveAttribute('data-theme', 'dark')

		await page.reload()
		await expect(html).toHaveAttribute('data-theme', 'dark')
		await expect(page.getByRole('button', { name: 'Включить светлую тему' })).toBeVisible()
	})

	test('тема по умолчанию берётся из настроек системы', async ({ browser }) => {
		const context = await browser.newContext({ colorScheme: 'dark' })
		const page = await context.newPage()

		await page.goto('/')

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
		await context.close()
	})

	test('выбор Telegram меняет оформление и запоминается', async ({ page }) => {
		await page.goto('/')
		const html = page.locator('html')
		await expect(html).toHaveAttribute('data-skin', 'max')
		const maxAccent = await html.evaluate((el) => el.style.getPropertyValue('--color-accent'))

		await page.getByText('Telegram', { exact: true }).click()

		await expect(html).toHaveAttribute('data-skin', 'telegram')
		expect(await html.evaluate((el) => el.style.getPropertyValue('--color-accent'))).not.toBe(maxAccent)

		await page.reload()
		await expect(html).toHaveAttribute('data-skin', 'telegram')
	})
})
