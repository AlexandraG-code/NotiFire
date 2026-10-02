/** Описание ошибки для показа пользователю. */
export interface ErrorReport {
	title: string
	description?: string
	/** Исходная ошибка: идёт в консоль для отладки. */
	cause?: unknown
}

/** Ошибка в очереди уведомлений: ждёт, пока её покажут. */
export interface NotificationItem extends ErrorReport {
	id: string
}

/** Превращает пойманную ошибку в текст для пользователя. */
export type ErrorDescriber = (error: unknown) => string | undefined

export interface AsyncActionOptions {
	/** Заголовок уведомления, если действие упало. */
	errorTitle: string
	/** Свой текст ошибки; по умолчанию берётся message самой ошибки. */
	describeError?: ErrorDescriber
}
