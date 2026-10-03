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
 * @property {boolean} [silent] - Не показывать ошибку пользователю, только записать в консоль (для фоновых проверок)
 */
export interface AsyncActionOptions {
	errorTitle: string
	describeError?: ErrorDescriber
	silent?: boolean
}

/**
 * Результат runAsyncAction: действие выполнилось (тогда есть то, что оно вернуло) или упало.
 * @property {boolean} isSuccess - Выполнилось ли действие
 * @property {T} [data] - Результат действия; есть только при isSuccess
 */
export type AsyncActionResult<T> = { isSuccess: true; data: T } | { isSuccess: false; data?: undefined }
