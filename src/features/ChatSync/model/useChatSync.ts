import { useCallback, useEffect } from 'react'

import { type Chat, ChatService, type ContactInfo, useChatStore } from '@entities/Chat'
import { MessageService, useMessageStore } from '@entities/Message'

import { type GreenApiCredentials, fromChatId } from '@shared/api/greenApi'

import { HISTORY_MESSAGE_COUNT } from './constants'
import { useChatSyncHelpers } from './useChatSyncHelpers'
import { useChatSyncStore } from './useChatSyncStore'

/** Чаты, которые уже синхронизировались в этой сессии: повторное открытие не гоняет запросы. */
const syncedChats = new Set<string>()

/**
 * Хук синхронизации открытого чата с GREEN-API: профиль собеседника (имя, аватар, настоящий chatId),
 * затем журнал сообщений. Работает один раз за сессию на чат; ошибки пользователю не показываются,
 * чат остаётся таким, какой есть.
 * @param {Chat} chat - Открытый чат
 * @param {GreenApiCredentials} credentials - Данные инстанса GREEN-API
 * @returns {boolean} Идёт ли сейчас загрузка профиля и истории
 */
export const useChatSync = (chat: Chat, credentials: GreenApiCredentials): boolean => {
	const addAlias = useChatStore((state) => state.addAlias)
	const updateChat = useChatStore((state) => state.updateChat)
	const mergeMessages = useMessageStore((state) => state.mergeMessages)
	const isSyncing = useChatSyncStore((state) => state.syncing[chat.id] ?? false)
	const setSyncing = useChatSyncStore((state) => state.setSyncing)

	const { toMessage, getContactTitle } = useChatSyncHelpers()

	/** Сохраняет в чат то, что нашлось в профиле: название, аватар и настоящий chatId как псевдоним. */
	const applyContact = useCallback(
		(contact: ContactInfo) => {
			const isKnownId = contact.chatId === chat.apiChatId || contact.chatId === fromChatId(chat.apiChatId)
			if (!isKnownId) {
				addAlias(chat.id, contact.chatId)
			}
			updateChat(chat.id, {
				title: getContactTitle(contact) ?? chat.title,
				avatarUrl: contact.avatar || undefined
			})
		},
		[chat.id, chat.apiChatId, chat.title, addAlias, updateChat, getContactTitle]
	)

	/** Запрашивает профиль; возвращает chatId, по которому искать историю (при ошибке — тот, что известен чату). */
	const loadContact = useCallback(async (): Promise<string> => {
		try {
			const contact = await ChatService.getContactInfo(credentials, chat.apiChatId)
			applyContact(contact)
			return contact.chatId
		} catch (error) {
			console.warn('Не удалось получить профиль собеседника', error)
			return chat.aliases[0] ?? chat.apiChatId
		}
	}, [credentials, chat.apiChatId, chat.aliases, applyContact])

	/** Запрашивает журнал по chatId и добавляет в чат текстовые сообщения, которых там ещё нет. */
	const loadHistory = useCallback(
		async (historyChatId: string) => {
			const history = await MessageService.getChatHistory(credentials, {
				chatId: historyChatId,
				count: HISTORY_MESSAGE_COUNT
			})
			mergeMessages(
				chat.id,
				history.flatMap((item) => toMessage(item, chat.id) ?? [])
			)
		},
		[credentials, chat.id, mergeMessages, toMessage]
	)

	/** Полная синхронизация чата: профиль, затем история; при сбое истории чат можно синхронизировать снова. */
	const syncChat = useCallback(async () => {
		if (syncedChats.has(chat.id)) {
			return
		}
		syncedChats.add(chat.id)
		setSyncing(chat.id, true)

		try {
			await loadHistory(await loadContact())
		} catch (error) {
			console.warn('Не удалось загрузить историю чата', error)
			syncedChats.delete(chat.id)
		} finally {
			setSyncing(chat.id, false)
		}
	}, [chat.id, setSyncing, loadContact, loadHistory])

	useEffect(() => {
		void syncChat()
	}, [syncChat])

	return isSyncing
}
