import react from '@vitejs/plugin-react'

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { type Plugin, defineConfig } from 'vite'

const ENV_CONFIG_SOURCE = resolve(import.meta.dirname, 'env-config.ts')
const ENV_CONFIG_URL = '/env-config.js'

/**
 * Отдаёт env-config как отдельный файл `env-config.js`, который грузится обычным скриптом до модулей приложения.
 * Иначе модули, читающие `window._env_` при загрузке, могли бы выполниться раньше конфига. В сборке файл лежит
 * рядом с index.html, поэтому значения на сервере можно поменять без пересборки.
 * @returns {Plugin} Плагин Vite
 */
const runtimeEnvConfig = (): Plugin => ({
	name: 'runtime-env-config',
	configureServer(server) {
		server.middlewares.use(ENV_CONFIG_URL, (_request, response) => {
			response.setHeader('Content-Type', 'text/javascript')
			response.end(readFileSync(ENV_CONFIG_SOURCE, 'utf-8'))
		})
	},
	generateBundle() {
		this.emitFile({
			type: 'asset',
			fileName: ENV_CONFIG_URL.slice(1),
			source: readFileSync(ENV_CONFIG_SOURCE, 'utf-8')
		})
	}
})

export default defineConfig({
	// относительные пути к файлам: сборка работает из любой папки, в том числе со страницы GitHub Pages
	base: './',
	plugins: [react(), runtimeEnvConfig()],
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
