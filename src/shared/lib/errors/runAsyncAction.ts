import { getErrorMessage } from './getErrorMessage'
import type { AsyncActionOptions, AsyncActionResult } from './types'
import { useNotificationStore } from './useNotificationStore'

/**
 * Выполняет асинхронное действие стора и сам ловит ошибки: вызывающему не нужен try/catch.
 * Возвращает то, что вернуло действие, а при ошибке сообщает о ней стору уведомлений
 * (или только в консоль, если задано `silent`).
 * @param {Function} action - Асинхронное действие, например запрос к API вместе с проверкой ответа
 * @param {AsyncActionOptions} options - Заголовок уведомления и, при необходимости, свой текст ошибки
 * @returns {Promise<AsyncActionResult<T>>} `{ isSuccess: true, data }` с результатом действия или `{ isSuccess: false }`
 */
export const runAsyncAction = async <T>(
	action: () => Promise<T>,
	{ errorTitle, describeError = getErrorMessage, silent = false }: AsyncActionOptions
): Promise<AsyncActionResult<T>> => {
	try {
		return { isSuccess: true, data: await action() }
	} catch (error) {
		if (silent) {
			console.warn(errorTitle, error)
			return { isSuccess: false }
		}

		useNotificationStore.getState().notifyError({
			title: errorTitle,
			description: describeError(error),
			cause: error
		})
		return { isSuccess: false }
	}
}
