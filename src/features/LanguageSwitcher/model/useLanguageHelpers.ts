import { useCallback, useMemo } from 'react'

import type { MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'

import { LANGUAGE_LABELS, Language } from '@shared/i18n'

/**
 * Небольшие утилиты выбора языка, собранные в одном хуке.
 * @returns {{ currentLanguage: string, changeLanguage: Function, languageMenuItems: MenuProps['items'] }}
 * Текущий язык, смена языка и готовые пункты меню для выбора языка
 */
export const useLanguageHelpers = () => {
	const { i18n } = useTranslation()

	const currentLanguage = i18n.language

	/**
	 * Переключает язык: подгружает переводы выбранного языка и перерисовывает интерфейс.
	 * @param {Language} language - Новый язык
	 * @returns {void}
	 */
	const changeLanguage = useCallback(
		(language: Language) => {
			void i18n.changeLanguage(language)
		},
		[i18n]
	)

	const languageMenuItems = useMemo<MenuProps['items']>(
		() =>
			Object.values(Language).map((language) => ({
				key: language,
				label: LANGUAGE_LABELS[language],
				onClick: () => changeLanguage(language)
			})),
		[changeLanguage]
	)

	return { currentLanguage, changeLanguage, languageMenuItems }
}
