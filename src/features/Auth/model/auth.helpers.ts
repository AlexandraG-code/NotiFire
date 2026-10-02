import { isAxiosError } from 'axios'

import { useChatStore } from '@entities/Chat'
import { useMessageStore } from '@entities/Message'

import { Namespace, i18n } from '@shared/i18n'
import { getErrorMessage } from '@shared/lib'

import { CHAT_DATA_OWNER_KEY, INVALID_CREDENTIALS_STATUSES } from './constants'

/**
 * Подбирает текст ошибки входа: отказ API по данным, нет связи или собственное сообщение проверки.
 * @param {unknown} error - Ошибка запроса или проверки
 * @returns {string | undefined} Текст для пользователя
 */
export const describeLoginError = (error: unknown): string | undefined => {
	if (!isAxiosError(error)) {
		return getErrorMessage(error)
	}

	const status = error.response?.status
	return status !== undefined && INVALID_CREDENTIALS_STATUSES.includes(status)
		? i18n.t('errors.invalidCredentials', { ns: Namespace.Auth })
		: i18n.t('errors.noConnection', { ns: Namespace.Auth })
}

/**
 * Стирает сохранённые чаты и сообщения вместе с меткой владельца: из памяти и из localStorage.
 * @returns {void}
 */
export const wipeChatData = (): void => {
	useChatStore.getState().reset()
	useMessageStore.getState().reset()
	useChatStore.persist.clearStorage()
	useMessageStore.persist.clearStorage()
	localStorage.removeItem(CHAT_DATA_OWNER_KEY)
}

/**
 * Закрепляет сохранённые чаты за инстансом: если они принадлежали другому инстансу (или владельца нет), стирает их.
 * Для того же инстанса история сохраняется.
 * @param {string} idInstance - Идентификатор инстанса, который входит в приложение
 * @returns {void}
 */
export const claimChatData = (idInstance: string): void => {
	if (localStorage.getItem(CHAT_DATA_OWNER_KEY) !== idInstance) {
		wipeChatData()
		localStorage.setItem(CHAT_DATA_OWNER_KEY, idInstance)
	}
}
