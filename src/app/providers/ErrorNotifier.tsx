import { useEffect } from 'react'

import { App as AntdApp } from 'antd'
import { isCancel } from 'axios'

import { getErrorMessage, reportError, setErrorListener } from '@shared/lib'

const UNHANDLED_REJECTION_EVENT = 'unhandledrejection'
const UNEXPECTED_ERROR_TITLE = 'Непредвиденная ошибка'
const ABORT_ERROR_NAME = 'AbortError'

/**
 * Отличает преднамеренную отмену запроса (остановка опроса и т.п.) от настоящей ошибки.
 * @param {unknown} reason - Причина отклонённого промиса
 * @returns {boolean} true, если запрос отменили сами
 */
const isIntentionalAbort = (reason: unknown): boolean =>
	isCancel(reason) || (reason instanceof Error && reason.name === ABORT_ERROR_NAME)

/**
 * Единственное место, где ошибки показываются пользователю: подписывается на reportError и выводит уведомление antd.
 * Заодно перехватывает необработанные отклонения промисов. Чтобы вместо уведомлений показывать окно ошибок,
 * достаточно изменить только этот компонент. Должен находиться внутри ThemeProvider.
 * @returns {null} Ничего не рисует
 */
export const ErrorNotifier = () => {
	const { notification } = AntdApp.useApp()

	useEffect(() => {
		setErrorListener(({ title, description }) =>
			// key: одинаковые ошибки подряд заменяют друг друга, а не копятся стопкой
			notification.error({ key: `${title}:${description}`, message: title, description })
		)

		const handleRejection = (event: PromiseRejectionEvent) => {
			if (isIntentionalAbort(event.reason)) return
			reportError({
				title: UNEXPECTED_ERROR_TITLE,
				description: getErrorMessage(event.reason),
				cause: event.reason
			})
		}
		window.addEventListener(UNHANDLED_REJECTION_EVENT, handleRejection)

		return () => {
			setErrorListener(null)
			window.removeEventListener(UNHANDLED_REJECTION_EVENT, handleRejection)
		}
	}, [notification])

	return null
}
