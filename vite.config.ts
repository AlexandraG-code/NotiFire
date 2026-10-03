import react from '@vitejs/plugin-react'

import { resolve } from 'path'
import { defineConfig } from 'vite'

import { contentSecurityPolicy } from './vite/contentSecurityPolicy.ts'
import { runtimeEnvConfig } from './vite/runtimeEnvConfig.ts'

const ENV_CONFIG_SOURCE = resolve(import.meta.dirname, 'env-config.ts')

export default defineConfig({
	// относительные пути к файлам: сборка работает из любой папки, в том числе со страницы GitHub Pages
	base: './',
	plugins: [react(), runtimeEnvConfig(ENV_CONFIG_SOURCE), contentSecurityPolicy(ENV_CONFIG_SOURCE)],
	resolve: {
		alias: {
			'@app': resolve(import.meta.dirname, './src/app'),
			'@pages': resolve(import.meta.dirname, './src/pages'),
			'@widgets': resolve(import.meta.dirname, './src/widgets'),
			'@features': resolve(import.meta.dirname, './src/features'),
			'@entities': resolve(import.meta.dirname, './src/entities'),
			'@shared': resolve(import.meta.dirname, './src/shared')
		}
	}
})
