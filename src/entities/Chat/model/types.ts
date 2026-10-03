import type { AvatarSize } from './enums'

/**
 * Чат с собеседником.
 * @property {string} id - Стабильный ключ чата и параметр URL: номер телефона или числовой chatId без суффикса
 * @property {string} apiChatId - chatId в том виде, в котором его принимает GREEN-API при отправке
 * @property {string[]} aliases - Другие chatId собеседника: сервис подменяет номер числовым идентификатором, и ответы
 * приходят с ним
 * @property {string} title - Название чата: имя собеседника или его номер
 * @property {string} [avatarUrl] - Ссылка на аватар собеседника; без неё показывается первая буква названия
 * @property {number} createdAt - Время создания чата в мс
 */
export interface Chat {
	id: string
	apiChatId: string
	aliases: string[]
	title: string
	avatarUrl?: string
	createdAt: number
}

export type NewChat = Pick<Chat, 'id' | 'apiChatId' | 'title'>

/** Поля чата, которые можно обновить после создания (приходят из профиля собеседника). */
export type ChatPatch = Partial<Pick<Chat, 'title' | 'avatarUrl'>>

/**
 * Свойства аватара чата.
 * @property {string} title - Название чата, из него берётся первая буква
 * @property {string} [src] - Ссылка на фото; если пусто или не загрузилось, показывается первая буква названия
 * @property {AvatarSize} [size] - Размер аватара, по умолчанию большой
 */
export interface ChatAvatarProps {
	title: string
	src?: string
	size?: AvatarSize
}
