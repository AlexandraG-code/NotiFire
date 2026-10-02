import type { BackendModule, ReadCallback } from 'i18next'

import { NAMESPACE_SEPARATOR } from './constants'

/** Загрузчики JSON-файлов переводов: каждый файл — отдельный кусок сборки, который скачивается только при вызове. */
const loaders = import.meta.glob<{ default: Record<string, unknown> }>('./locales/*/*/*.json')

/** Бэкенд i18next: читает переводы страницы и языка по структуре `locales/<страница>/<язык>/<файл>.json`. */
export const LocaleBackend: BackendModule = {
	type: 'backend',

	/** Настройки не нужны: пути определяются структурой папок. */
	init() {
		// ничего не настраивается
	},

	/**
	 * Загружает один файл переводов для пары «язык и пространство».
	 * @param {string} language - Код языка, например `ru`
	 * @param {string} namespace - Пространство имён вида `auth/auth`
	 * @param {ReadCallback} callback - Вызывается с данными или с ошибкой
	 * @returns {void}
	 */
	read(language: string, namespace: string, callback: ReadCallback) {
		const [page, file] = namespace.split(NAMESPACE_SEPARATOR)
		const load = loaders[`./locales/${page}/${language}/${file}.json`]

		if (!load) {
			callback(new Error(`Нет перевода для ${namespace} (${language})`), null)
			return
		}

		load()
			.then(({ default: resources }) => callback(null, resources))
			.catch((error: Error) => callback(error, null))
	}
}
