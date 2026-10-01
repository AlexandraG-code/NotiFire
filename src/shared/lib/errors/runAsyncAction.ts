import { reportError } from './errorReporter'
import { getErrorMessage } from './getErrorMessage'
import type { AsyncActionOptions } from './types'

/**
 * Выполняет асинхронное действие стора и сам ловит ошибки: вызывающему не нужен try/catch.
 * При ошибке сообщает о ней через reportError.
 * @param {Function} action - Асинхронное действие
 * @param {AsyncActionOptions} options - Заголовок уведомления об ошибке
 * @returns {Promise<boolean>} true, если действие выполнилось, и false, если упало
 */
export const runAsyncAction = async (
	action: () => Promise<void>,
	{ errorTitle }: AsyncActionOptions
): Promise<boolean> => {
	try {
		await action()
		return true
	} catch (error) {
		reportError({ title: errorTitle, description: getErrorMessage(error), cause: error })
		return false
	}
}
