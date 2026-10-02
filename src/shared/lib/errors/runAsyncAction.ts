import { getErrorMessage } from './getErrorMessage'
import type { AsyncActionOptions } from './types'
import { useNotificationStore } from './useNotificationStore'

/**
 * Выполняет асинхронное действие стора и сам ловит ошибки: вызывающему не нужен try/catch.
 * При ошибке сообщает о ней стору уведомлений (или только в консоль, если задано `silent`).
 * @param {Function} action - Асинхронное действие
 * @param {AsyncActionOptions} options - Заголовок уведомления и, при необходимости, свой текст ошибки
 * @returns {Promise<boolean>} true, если действие выполнилось, и false, если упало
 */
export const runAsyncAction = async (
	action: () => Promise<void>,
	{ errorTitle, describeError = getErrorMessage, silent = false }: AsyncActionOptions
): Promise<boolean> => {
	try {
		await action()
		return true
	} catch (error) {
		if (silent) {
			console.warn(errorTitle, error)
			return false
		}

		useNotificationStore.getState().notifyError({
			title: errorTitle,
			description: describeError(error),
			cause: error
		})
		return false
	}
}
