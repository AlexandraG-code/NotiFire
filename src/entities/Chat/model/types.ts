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
