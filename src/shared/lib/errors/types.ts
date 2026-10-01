/** Описание ошибки для показа пользователю. */
export interface ErrorReport {
	title: string
	description?: string
	/** Исходная ошибка: идёт в консоль для отладки. */
	cause?: unknown
}

export type ErrorListener = (report: ErrorReport) => void

export interface AsyncActionOptions {
	/** Заголовок уведомления, если действие упало. */
	errorTitle: string
}
