import { Language } from './enums'

export const DEFAULT_LANGUAGE = Language.Ru
export const LANGUAGE_STORAGE_KEY = 'language'

/** Разделитель страницы и файла в имени пространства: `auth/auth`. */
export const NAMESPACE_SEPARATOR = '/'

/** Названия языков на самих языках: не переводятся. */
export const LANGUAGE_LABELS: Record<Language, string> = {
	[Language.Ru]: 'Русский',
	[Language.En]: 'English'
}
