import { MoonOutlined, SunOutlined } from '@ant-design/icons'

import { Button } from 'antd'

import { ThemeMode } from '@shared/theme'

import { useThemeStore } from '../model/useThemeStore'
import { useThemeToggle } from '../model/useThemeToggle'

/**
 * Кнопка переключения светлой и тёмной темы.
 * @returns {JSX.Element} Кнопка переключения темы
 */
export const ThemeSwitch = () => {
	const mode = useThemeStore((state) => state.mode)
	const toggleTheme = useThemeToggle()
	const isDark = mode === ThemeMode.Dark

	return (
		<Button
			type="text"
			shape="circle"
			aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
			icon={isDark ? <SunOutlined /> : <MoonOutlined />}
			onClick={(event) => toggleTheme({ x: event.clientX, y: event.clientY })}
		/>
	)
}
