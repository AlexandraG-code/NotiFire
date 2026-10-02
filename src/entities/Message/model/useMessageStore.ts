import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { MESSAGE_STORAGE_KEY } from './constants'
import type { Message, MessagePatch } from './types'

interface MessageState {
	byChat: Record<string, Message[]>
}

/**
 * Действия стора сообщений.
 * @property {Function} addMessage - Добавляет сообщение; если сообщение с таким id в чате уже есть, ничего не делает
 * @property {Function} updateMessage - Меняет идентификатор и статус сообщения
 * @property {Function} mergeMessages - Добавляет пачку сообщений (например, историю чата): пропускает уже известные и
 * сортирует по времени
 * @property {Function} reset - Удаляет все сообщения
 * @property {Function} moveMessages - Переносит все сообщения одного чата в другой (при слиянии дублей), сохраняя
 * порядок по времени
 */
interface MessageActions {
	addMessage: (message: Message) => void
	updateMessage: (chatId: string, id: string, patch: MessagePatch) => void
	mergeMessages: (chatId: string, messages: Message[]) => void
	reset: () => void
	moveMessages: (fromChatId: string, toChatId: string) => void
}

/** Стор сообщений по чатам; история хранится в localStorage, т.к. GREEN-API не отдаёт входящие повторно. */
export const useMessageStore = create<MessageState & MessageActions>()(
	persist(
		(set) => ({
			byChat: {},
			addMessage: (message) =>
				set((state) => {
					const messages = state.byChat[message.chatId] ?? []
					if (messages.some((item) => item.id === message.id)) {
						return state
					}
					return { byChat: { ...state.byChat, [message.chatId]: [...messages, message] } }
				}),
			updateMessage: (chatId, id, patch) =>
				set((state) => ({
					byChat: {
						...state.byChat,
						[chatId]: (state.byChat[chatId] ?? []).map((message) =>
							message.id === id ? { ...message, ...patch } : message
						)
					}
				})),
			mergeMessages: (chatId, messages) =>
				set((state) => {
					const existing = state.byChat[chatId] ?? []
					const known = new Set(existing.map((message) => message.id))
					const added = messages.filter((message) => !known.has(message.id))
					if (added.length === 0) {
						return state
					}

					const merged = [...existing, ...added].sort((a, b) => a.timestamp - b.timestamp)
					return { byChat: { ...state.byChat, [chatId]: merged } }
				}),
			reset: () => set({ byChat: {} }),
			moveMessages: (fromChatId, toChatId) =>
				set((state) => {
					const { [fromChatId]: moved = [], ...rest } = state.byChat
					const target = rest[toChatId] ?? []
					const known = new Set(target.map((message) => message.id))
					const merged = [...target, ...moved.filter((message) => !known.has(message.id))]
					return {
						byChat: {
							...rest,
							[toChatId]: merged
								.map((m) => ({ ...m, chatId: toChatId }))
								.sort((a, b) => a.timestamp - b.timestamp)
						}
					}
				})
		}),
		{ name: MESSAGE_STORAGE_KEY, partialize: ({ byChat }) => ({ byChat }) }
	)
)
