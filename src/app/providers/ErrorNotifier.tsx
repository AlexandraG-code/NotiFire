import { useCallback, useEffect } from 'react'

import { App as AntdApp } from 'antd'

import { useNotificationStore } from '@shared/lib'

/**
 * Единственное место, где ошибки показываются пользователю: берёт их из стора уведомлений и выводит
 * уведомление antd. Чтобы вместо уведомлений показывать окно ошибок, достаточно изменить только этот компонент.
 * Должен находиться внутри ThemeProvider.
 * @returns {null} Ничего не рисует
 */
export const ErrorNotifier = () => {
	const items = useNotificationStore((state) => state.items)
	const dismiss = useNotificationStore((state) => state.dismiss)

	const { notification } = AntdApp.useApp()

	/** Показывает ошибки из очереди уведомлениями antd и убирает их из очереди. */
	const showItems = useCallback(() => {
		items.forEach(({ id, title, description }) => {
			// key: одинаковые ошибки подряд заменяют друг друга, а не копятся стопкой
			notification.error({ key: `${title}:${description}`, message: title, description })
			dismiss(id)
		})
	}, [items, notification, dismiss])

	useEffect(showItems, [showItems])

	return null
}
