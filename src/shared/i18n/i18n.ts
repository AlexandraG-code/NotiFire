import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { LocaleBackend } from './LocaleBackend'
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from './constants'
import { Language, Namespace } from './enums'

const SUPPORTED_LANGUAGES = Object.values(Language)

/**
 * Приводит определённый язык к поддерживаемому: `ru-RU` → `ru`, неизвестный → язык по умолчанию.
 * Благодаря этому грузится один язык, а запасной (fallbackLng) не нужен.
 * @param {string} detected - Язык из браузера или хранилища
 * @returns {Language} Поддерживаемый язык
 */
const toSupportedLanguage = (detected: string): Language =>
	SUPPORTED_LANGUAGES.find((language) => detected.toLowerCase().startsWith(language)) ?? DEFAULT_LANGUAGE

void i18n
	.use(LocaleBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		supportedLngs: SUPPORTED_LANGUAGES,
		// Запасной язык не задаём: иначе вместе с выбранным грузился бы и он
		fallbackLng: false,
		// На старте грузится только общее пространство; страничные подгружаются при открытии страницы
		ns: [Namespace.Common],
		defaultNS: Namespace.Common,
		interpolation: { escapeValue: false },
		detection: {
			order: ['localStorage', 'navigator'],
			lookupLocalStorage: LANGUAGE_STORAGE_KEY,
			caches: ['localStorage'],
			convertDetectedLanguage: toSupportedLanguage
		}
	})

i18n.on('languageChanged', (language) => {
	document.documentElement.lang = language
})

export default i18n
