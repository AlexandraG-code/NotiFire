export interface Chat {
	/** Стабильный ключ чата и параметр URL: номер телефона или числовой chatId без суффикса. */
	id: string
	/** chatId в том виде, в котором его принимает GREEN-API при отправке. */
	apiChatId: string
	/** Другие chatId того же собеседника: сервис превращает номер в числовой идентификатор, и ответы приходят с ним. */
	aliases: string[]
	title: string
	createdAt: number
}

export type NewChat = Pick<Chat, 'id' | 'apiChatId' | 'title'>

export interface ChatState {
	chats: Chat[]
}

export interface ChatActions {
	/** Создаёт чат или возвращает уже существующий с тем же id. */
	addChat: (chat: NewChat) => Chat
	/** Добавляет чату дополнительный chatId собеседника. */
	addAlias: (id: string, apiChatId: string) => void
	removeChat: (id: string) => void
	/** Удаляет все чаты. */
	reset: () => void
}

export type ChatStore = ChatState & ChatActions
