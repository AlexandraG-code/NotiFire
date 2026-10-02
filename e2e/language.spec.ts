import { expect, test } from '@playwright/test'

test.describe('язык интерфейса', () => {
	test('по умолчанию берётся язык браузера: русский', async ({ page }) => {
		await page.goto('/')

		await expect(page.getByRole('button', { name: 'Войти' })).toBeVisible()
	})

	test.describe('браузер на английском', () => {
		test.use({ locale: 'en-US' })

		test('интерфейс показывается на английском', async ({ page }) => {
			await page.goto('/')

			await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
			await expect(page.locator('html')).toHaveAttribute('lang', 'en')
		})
	})
})
