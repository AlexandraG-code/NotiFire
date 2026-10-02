import { type PropsWithChildren, useLayoutEffect, useMemo } from 'react'

import { App as AntdApp, ConfigProvider } from 'antd'
import type { Locale } from 'antd/es/locale'
import enUS from 'antd/locale/en_US'
import ruRU from 'antd/locale/ru_RU'
import { useTranslation } from 'react-i18next'

import { useSkinStore } from '@features/MessengerSelect'
import { useThemeStore } from '@features/ThemeSwitcher'

import { Language } from '@shared/i18n'
import { applyThemeVars, getAntdTheme } from '@shared/theme'

/** Встроенные тексты компонентов antd (пустые списки, подтверждения и т.п.) по языкам приложения. */
const ANTD_LOCALES: Record<string, Locale> = {
	[Language.Ru]: ruRU,
	[Language.En]: enUS
}

/**
 * Применяет выбранную тему: токены antd и CSS-переменные для собственных стилей.
 * Оборачивает приложение в antd App, чтобы уведомления (notification) подхватывали тему,
 * и передаёт antd язык приложения для встроенных текстов компонентов.
 * @param {ReactNode} children - Содержимое приложения
 * @returns {JSX.Element} Провайдер темы antd
 */
export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const mode = useThemeStore((state) => state.mode)
	const skin = useSkinStore((state) => state.skin)

	const { i18n } = useTranslation()

	const antdTheme = useMemo(() => getAntdTheme(skin, mode), [skin, mode])

	useLayoutEffect(() => applyThemeVars(skin, mode), [skin, mode])

	return (
		<ConfigProvider theme={antdTheme} locale={ANTD_LOCALES[i18n.language]}>
			<AntdApp>{children}</AntdApp>
		</ConfigProvider>
	)
}
