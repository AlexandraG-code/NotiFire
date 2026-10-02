import { useEffect } from 'react'

import { App as AntdApp } from 'antd'
import { isCancel } from 'axios'

import { i18n } from '@shared/i18n'
import { getErrorMessage, useNotificationStore } from '@shared/lib'

const UNHANDLED_REJECTION_EVENT = 'unhandledrejection'
const ABORT_ERROR_NAME = 'AbortError'

/**
 * Отличает преднамеренную отмену запроса (остановка опроса и т.п.) от настоящей ошибки.
 * @param {unknown} reason - Причина отклонённого промиса
 * @returns {boolean} true, если запрос отменили сами
 */
const isIntentionalAbort = (reason: unknown): boolean =>
	isCancel(reason) || (reason instanceof Error && reason.name === ABORT_ERROR_NAME)

/**
 * Единственное место, где ошибки показываются пользователю: берёт их из стора уведомлений и выводит
 * уведомление antd. Заодно перехватывает необработанные отклонения промисов. Чтобы вместо уведомлений показывать
 * окно ошибок, достаточно изменить только этот компонент. Должен находиться внутри ThemeProvider.
 * @returns {null} Ничего не рисует
 */
export const ErrorNotifier = () => {
	const items = useNotificationStore((state) => state.items)
	const notifyError = useNotificationStore((state) => state.notifyError)
	const dismiss = useNotificationStore((state) => state.dismiss)

	const { notification } = AntdApp.useApp()

	useEffect(() => {
		items.forEach(({ id, title, description }) => {
			// key: одинаковые ошибки подряд заменяют друг друга, а не копятся стопкой
			notification.error({ key: `${title}:${description}`, message: title, description })
			dismiss(id)
		})
	}, [items, notification, dismiss])

	useEffect(() => {
		const handleRejection = (event: PromiseRejectionEvent) => {
			if (isIntentionalAbort(event.reason)) {
				return
			}
			notifyError({
				title: i18n.t('errors.unexpected'),
				description: getErrorMessage(event.reason),
				cause: event.reason
			})
		}
		window.addEventListener(UNHANDLED_REJECTION_EVENT, handleRejection)

		return () => window.removeEventListener(UNHANDLED_REJECTION_EVENT, handleRejection)
	}, [notifyError])

	return null
}
