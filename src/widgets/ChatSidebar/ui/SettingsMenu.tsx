import { LogoutOutlined, MoonOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons'

import { Dropdown, type MenuProps } from 'antd'

import { useLogout } from '@features/Auth'
import { useThemeStore, useThemeToggle } from '@features/Theme'

import { ThemeMode } from '@shared/theme'

import styles from './SettingsMenu.module.css'

/**
 * Меню настроек внизу сайдбара: переключение темы и выход.
 * @returns {JSX.Element} Кнопка с выпадающим меню
 */
export const SettingsMenu = () => {
	const mode = useThemeStore((state) => state.mode)
	const toggleTheme = useThemeToggle()
	const logout = useLogout()
	const isDark = mode === ThemeMode.Dark

	const items: MenuProps['items'] = [
		{
			key: 'theme',
			icon: isDark ? <SunOutlined /> : <MoonOutlined />,
			label: isDark ? 'Светлая тема' : 'Тёмная тема',
			onClick: () => toggleTheme({ x: 0, y: window.innerHeight })
		},
		{ key: 'logout', icon: <LogoutOutlined />, label: 'Выйти', danger: true, onClick: logout }
	]

	return (
		<Dropdown menu={{ items }} trigger={['click']} placement="topLeft">
			<button type="button" className={styles.trigger}>
				<SettingOutlined />
				Настройки
			</button>
		</Dropdown>
	)
}
