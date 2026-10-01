import type { ErrorListener, ErrorReport } from './types'

let listener: ErrorListener | null = null

/**
 * Регистрирует единственного получателя ошибок: компонент, который показывает их пользователю.
 * @param {ErrorListener | null} nextListener - Получатель; null снимает регистрацию
 * @returns {void}
 */
export const setErrorListener = (nextListener: ErrorListener | null): void => {
	listener = nextListener
}

/**
 * Единая точка сообщения об ошибках: пишет в консоль и передаёт получателю для показа пользователю.
 * @param {ErrorReport} report - Описание ошибки
 * @returns {void}
 */
export const reportError = (report: ErrorReport): void => {
	console.error(report.title, report.cause ?? report.description)
	listener?.(report)
}
