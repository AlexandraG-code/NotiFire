/**
 * Описание ошибки для показа пользователю.
 * @property {string} title - Заголовок уведомления
 * @property {string} [description] - Подробности: текст, понятный пользователю
 * @property {unknown} [cause] - Исходная ошибка: идёт в консоль для отладки
 */
export interface ErrorReport {
	title: string
	description?: string
	cause?: unknown
}

/** Ошибка в очереди уведомлений: ждёт, пока её покажут. */
export interface NotificationItem extends ErrorReport {
	id: string
}

/** Превращает пойманную ошибку в текст для пользователя. */
export type ErrorDescriber = (error: unknown) => string | undefined

/**
 * Параметры runAsyncAction.
 * @property {string} errorTitle - Заголовок уведомления, если действие упало
 * @property {ErrorDescriber} [describeError] - Свой текст ошибки; по умолчанию берётся message самой ошибки
 */
export interface AsyncActionOptions {
	errorTitle: string
	describeError?: ErrorDescriber
}
