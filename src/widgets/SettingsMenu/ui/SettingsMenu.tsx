import { GlobalOutlined, LogoutOutlined, MoonOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons'

import { Dropdown, type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'

import { useAuthStore } from '@features/Auth'
import { useLanguageHelpers } from '@features/LanguageSwitcher'
import { useThemeStore, useThemeToggle } from '@features/ThemeSwitcher'

import { ThemeMode } from '@shared/theme'

import styles from './SettingsMenu.module.scss'

/**
 * Меню настроек внизу сайдбара: переключение темы и выход.
 * @returns {JSX.Element} Кнопка с выпадающим меню
 */
export const SettingsMenu = () => {
	const mode = useThemeStore((state) => state.mode)
	const logout = useAuthStore((state) => state.logout)

	const { t } = useTranslation()

	const toggleTheme = useThemeToggle()
	const { currentLanguage, languageMenuItems } = useLanguageHelpers()

	const isDark = mode === ThemeMode.Dark

	const items: MenuProps['items'] = [
		{
			key: 'theme',
			icon: isDark ? <SunOutlined /> : <MoonOutlined />,
			label: isDark ? t('settings.lightTheme') : t('settings.darkTheme'),
			onClick: () => toggleTheme({ x: 0, y: window.innerHeight })
		},
		{ key: 'language', icon: <GlobalOutlined />, label: t('settings.language'), children: languageMenuItems },
		{ key: 'logout', icon: <LogoutOutlined />, label: t('settings.logout'), danger: true, onClick: logout }
	]

	return (
		<Dropdown menu={{ items, selectedKeys: [currentLanguage] }} trigger={['click']} placement="topLeft">
			<button type="button" className={styles.trigger}>
				<SettingOutlined />
				{t('settings.title')}
			</button>
		</Dropdown>
	)
}
