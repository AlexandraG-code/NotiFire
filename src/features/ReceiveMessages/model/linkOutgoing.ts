import { findChatByApiId, useChatStore } from '@entities/Chat'
import { useMessageStore } from '@entities/Message'

import { sleep } from '@shared/lib'

import { LINK_ATTEMPTS, LINK_RETRY_DELAY_MS } from './constants'
import type { OutgoingConfirmation } from './types'

const findOwnerChatId = (idMessage: string): string | undefined =>
	Object.entries(useMessageStore.getState().byChat).find(([, messages]) =>
		messages.some((message) => message.id === idMessage)
	)?.[0]

const attachAlias = (ownerId: string, apiChatId: string) => {
	const { chats, addAlias, removeChat } = useChatStore.getState()
	const owner = chats.find((chat) => chat.id === ownerId)
	if (!owner || owner.apiChatId === apiChatId || owner.aliases.includes(apiChatId)) return

	// Ответ мог прийти раньше подтверждения и создать отдельный чат — сливаем его с нашим
	const duplicate = findChatByApiId(chats, apiChatId)
	if (duplicate && duplicate.id !== ownerId) {
		useMessageStore.getState().moveMessages(duplicate.id, ownerId)
		removeChat(duplicate.id)
	}
	addAlias(ownerId, apiChatId)
}

/**
 * Привязывает настоящий chatId получателя к чату, из которого было отправлено сообщение: сервис превращает
 * номер телефона в числовой идентификатор, и ответы приходят уже с ним.
 * @param {OutgoingConfirmation} confirmation - Подтверждение отправки из уведомления
 * @returns {Promise<void>} Разрешается после привязки или когда попытки закончились
 */
export const linkOutgoing = async ({ idMessage, apiChatId }: OutgoingConfirmation): Promise<void> => {
	for (let attempt = 0; attempt < LINK_ATTEMPTS; attempt++) {
		const ownerId = findOwnerChatId(idMessage)
		if (ownerId) {
			attachAlias(ownerId, apiChatId)
			return
		}
		await sleep(LINK_RETRY_DELAY_MS)
	}
}
