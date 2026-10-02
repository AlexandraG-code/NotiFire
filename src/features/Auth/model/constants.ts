import { HttpStatus } from '@shared/api'

export const AUTH_STORAGE_KEY = 'auth'
/** Ключ localStorage с idInstance владельца сохранённых чатов и сообщений. */
export const CHAT_DATA_OWNER_KEY = 'chat-data-owner'

/** Статусы, которыми GREEN-API отвечает на неверные idInstance или apiTokenInstance. */
export const INVALID_CREDENTIALS_STATUSES: number[] = [
	HttpStatus.BadRequest,
	HttpStatus.Unauthorized,
	HttpStatus.Forbidden,
	HttpStatus.NotFound
]
