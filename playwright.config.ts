import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const BASE_PATH = '/'

export default defineConfig({
	testDir: './e2e',
	// тесты идут против настоящей сборки: так ловятся ошибки, которых нет в dev-режиме
	webServer: {
		command: `yarn build && yarn preview --port ${PORT} --strictPort`,
		url: `http://localhost:${PORT}${BASE_PATH}`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	},
	use: {
		// язык интерфейса берётся из браузера: тесты ищут русские подписи
		locale: 'ru-RU',
		baseURL: `http://localhost:${PORT}${BASE_PATH}`,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI
		? [['github'], ['junit', { outputFile: 'test-results/e2e-junit.xml' }], ['html', { open: 'never' }]]
		: [['list']]
})
