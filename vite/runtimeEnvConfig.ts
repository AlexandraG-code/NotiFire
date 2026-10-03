import { readFileSync } from 'fs'
import type { Plugin } from 'vite'

const ENV_CONFIG_URL = '/env-config.js'

/**
 * Отдаёт env-config как отдельный файл `env-config.js`, который грузится обычным скриптом до модулей приложения.
 * Иначе модули, читающие `window._env_` при загрузке, могли бы выполниться раньше конфига. В сборке файл лежит
 * рядом с index.html, поэтому значения на сервере можно поменять без пересборки.
 * @param {string} source - Путь к `env-config.ts`
 * @returns {Plugin} Плагин Vite
 */
export const runtimeEnvConfig = (source: string): Plugin => ({
	name: 'runtime-env-config',
	configureServer(server) {
		server.middlewares.use(ENV_CONFIG_URL, (_request, response) => {
			response.setHeader('Content-Type', 'text/javascript')
			response.end(readFileSync(source, 'utf-8'))
		})
	},
	generateBundle() {
		this.emitFile({ type: 'asset', fileName: ENV_CONFIG_URL.slice(1), source: readFileSync(source, 'utf-8') })
	}
})
