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

			// Сколько последних сообщений подгружать из журнала при открытии чата
			HISTORY_MESSAGE_COUNT: string

			// Сколько раз искать отправленное сообщение среди уведомлений
			LINK_ATTEMPTS: string

			// Пауза между попытками поиска отправленного сообщения, мс
			LINK_RETRY_DELAY_MS: string

			// Как часто перечитывать настройки инстанса при включении уведомлений, мс
			SETTINGS_CHECK_INTERVAL_MS: string
		}
	}
}
