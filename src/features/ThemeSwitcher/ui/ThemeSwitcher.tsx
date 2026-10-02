import { MoonOutlined, SunOutlined } from '@ant-design/icons'

import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

import { ThemeMode } from '@shared/theme'

import { useThemeStore } from '../model/useThemeStore'
import { useThemeToggle } from '../model/useThemeToggle'

/**
 * Кнопка переключения светлой и тёмной темы.
 * @returns {JSX.Element} Кнопка переключения темы
 */
export const ThemeSwitcher = () => {
	const mode = useThemeStore((state) => state.mode)

	const { t } = useTranslation()

	const toggleTheme = useThemeToggle()

	const isDark = mode === ThemeMode.Dark

	return (
		<Button
			type="text"
			shape="circle"
			aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
			icon={isDark ? <SunOutlined /> : <MoonOutlined />}
			onClick={(event) => toggleTheme({ x: event.clientX, y: event.clientY })}
		/>
	)
}
