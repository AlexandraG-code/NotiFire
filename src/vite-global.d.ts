export declare global {
	interface Window {
		/** Runtime-конфиг из `env-config.ts` в корне проекта. */
		_env_: {
			// Шаблон хоста GREEN-API, `{shard}` — первые 4 цифры idInstance
			GREEN_API_URL_TEMPLATE: string

			// Таймаут HTTP-запросов, мс
			API_TIMEOUT_MS: string

			// Таймаут ожидания receiveNotification, секунды
			NOTIFICATION_RECEIVE_TIMEOUT_S: string

			// Пауза перед повтором опроса после ошибки, мс
			NOTIFICATION_RETRY_DELAY_MS: string
		}
	}
}
