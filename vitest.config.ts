import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config.ts'

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: 'jsdom',
			globals: true,
			setupFiles: ['./src/test/setup.ts'],
			include: ['src/**/*.test.{ts,tsx}'],
			// стили не нужны: достаточно, чтобы импорт .scss не падал
			css: false,
			// junit нужен CI, чтобы показать результат каждого теста на странице запуска
			reporters: process.env.CI ? ['default', 'junit'] : ['default'],
			outputFile: { junit: './test-results/vitest-junit.xml' }
		}
	})
)
