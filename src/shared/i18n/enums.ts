export enum Language {
	Ru = 'ru',
	En = 'en'
}

/**
 * Пространства имён по страницам. Значение — `<страница>/<файл>`: переводы лежат в
 * `locales/<страница>/<язык>/<файл>.json`. Новое пространство: добавить значение сюда, файлы en и ru и тип в types.ts.
 */
export enum Namespace {
	Common = 'common/common',
	Auth = 'auth/auth',
	Chat = 'chat/chat'
}
