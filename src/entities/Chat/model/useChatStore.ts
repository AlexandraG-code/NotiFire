import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CHAT_STORAGE_KEY, CHAT_STORAGE_VERSION } from './constants'
import type { Chat, NewChat } from './types'

interface ChatState {
	chats: Chat[]
}

interface ChatActions {
	/** Создаёт чат или возвращает уже существующий с тем же id. */
	addChat: (chat: NewChat) => Chat
	/** Добавляет чату дополнительный chatId собеседника. */
	addAlias: (id: string, apiChatId: string) => void
	removeChat: (id: string) => void
	/** Удаляет все чаты. */
	reset: () => void
}

/** Стор чатов; хранится в localStorage. */
export const useChatStore = create<ChatState & ChatActions>()(
	persist(
		(set, get) => ({
			chats: [],
			addChat: (newChat) => {
				const existing = get().chats.find((chat) => chat.id === newChat.id)
				if (existing) return existing

				const chat: Chat = { ...newChat, aliases: [], createdAt: Date.now() }
				set((state) => ({ chats: [chat, ...state.chats] }))
				return chat
			},
			addAlias: (id, apiChatId) =>
				set((state) => ({
					chats: state.chats.map((chat) =>
						chat.id === id && !chat.aliases.includes(apiChatId)
							? { ...chat, aliases: [...chat.aliases, apiChatId] }
							: chat
					)
				})),
			removeChat: (id) => set((state) => ({ chats: state.chats.filter((chat) => chat.id !== id) })),
			reset: () => set({ chats: [] })
		}),
		{
			name: CHAT_STORAGE_KEY,
			version: CHAT_STORAGE_VERSION,
			partialize: ({ chats }) => ({ chats }),
			// v1 не знала про aliases
			migrate: (persisted) => {
				const state = persisted as ChatState
				return { chats: state.chats.map((chat) => ({ ...chat, aliases: chat.aliases ?? [] })) }
			}
		}
	)
)
