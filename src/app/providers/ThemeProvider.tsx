import { type PropsWithChildren, useLayoutEffect, useMemo } from 'react'

import { App as AntdApp, ConfigProvider } from 'antd'

import { useThemeStore } from '@features/Theme'

import { applyThemeVars, getAntdTheme } from '@shared/theme'

/**
 * Применяет выбранную тему: токены antd и CSS-переменные для собственных стилей.
 * Оборачивает приложение в antd App, чтобы уведомления (notification) подхватывали тему.
 * @param {ReactNode} children - Содержимое приложения
 * @returns {JSX.Element} Провайдер темы antd
 */
export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const mode = useThemeStore((state) => state.mode)
	const antdTheme = useMemo(() => getAntdTheme(mode), [mode])

	useLayoutEffect(() => applyThemeVars(mode), [mode])

	return (
		<ConfigProvider theme={antdTheme}>
			<AntdApp>{children}</AntdApp>
		</ConfigProvider>
	)
}
