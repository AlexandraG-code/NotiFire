import { readFileSync } from 'fs'
import type { Plugin } from 'vite'

const API_TEMPLATE_PATTERN = /GREEN_API_URL_TEMPLATE:\s*'([^']+)'/
const ORIGIN_PATTERN = /^https?:\/\/[^/]+/
const SHARD_PLACEHOLDER = '{shard}'
const GOOGLE_FONTS_STYLES = 'https://fonts.googleapis.com'
const GOOGLE_FONTS_FILES = 'https://fonts.gstatic.com'

/**
 * Достаёт из env-config адрес API в виде для CSP: `{shard}` заменяется на `*`, чтобы подошли все серверы инстансов.
 * @param {string} source - Путь к `env-config.ts`
 * @returns {string} Например, `https://*.api.green-api.com`
 */
const getApiOrigin = (source: string): string => {
	const template = API_TEMPLATE_PATTERN.exec(readFileSync(source, 'utf-8'))?.[1]
	const origin = template && ORIGIN_PATTERN.exec(template)?.[0]
	if (!origin) {
		throw new Error('В env-config.ts не найден GREEN_API_URL_TEMPLATE: нечего разрешать в Content-Security-Policy')
	}
	return origin.replace(SHARD_PLACEHOLDER, '*')
}

/**
 * Добавляет в собранный index.html политику Content-Security-Policy: страница загружает скрипты только со своего
 * адреса и отправляет запросы только на свой адрес и на API GREEN-API. Так чужой скрипт не загрузится, а токен
 * из хранилища некуда будет отправить. В режиме разработки политика не добавляется: ей мешает служебный код Vite.
 * Стили разрешены встроенные: их пишут antd и motion.
 * @param {string} envConfig - Путь к `env-config.ts`: из него берётся адрес API
 * @returns {Plugin} Плагин Vite
 */
export const contentSecurityPolicy = (envConfig: string): Plugin => ({
	name: 'content-security-policy',
	apply: 'build',
	transformIndexHtml: {
		order: 'post',
		handler: () => {
			const policy = [
				"default-src 'self'",
				"script-src 'self'",
				`style-src 'self' 'unsafe-inline' ${GOOGLE_FONTS_STYLES}`,
				`font-src 'self' ${GOOGLE_FONTS_FILES}`,
				"img-src 'self' data: https:",
				`connect-src 'self' ${getApiOrigin(envConfig)}`,
				"object-src 'none'",
				"base-uri 'self'",
				"form-action 'self'"
			].join('; ')

			return [
				{
					tag: 'meta',
					attrs: { 'http-equiv': 'Content-Security-Policy', content: policy },
					injectTo: 'head-prepend'
				}
			]
		}
	}
})
