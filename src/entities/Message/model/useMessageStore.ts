import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { MESSAGE_STORAGE_KEY } from './constants'
import type { MessageStore } from './types'

/** Стор сообщений по чатам; история хранится в localStorage, т.к. GREEN-API не отдаёт входящие повторно. */
export const useMessageStore = create<MessageStore>()(
	persist(
		(set) => ({
			byChat: {},
			addMessage: (message) =>
				set((state) => {
					const messages = state.byChat[message.chatId] ?? []
					if (messages.some((item) => item.id === message.id)) return state
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
