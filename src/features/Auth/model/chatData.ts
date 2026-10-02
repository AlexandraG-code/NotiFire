import { useChatStore } from '@entities/Chat'
import { useMessageStore } from '@entities/Message'

import { CHAT_DATA_OWNER_KEY } from './constants'

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
