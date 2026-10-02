import { GlobalOutlined } from '@ant-design/icons'

import { Button, Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'

import { useLanguageHelpers } from '../model/useLanguageHelpers'

/**
 * Кнопка выбора языка с выпадающим списком; текущий язык подсвечен.
 * @returns {JSX.Element} Кнопка переключения языка
 */
export const LanguageSwitcher = () => {
	const { t } = useTranslation()

	const { currentLanguage, languageMenuItems } = useLanguageHelpers()

	return (
		<Dropdown menu={{ items: languageMenuItems, selectedKeys: [currentLanguage] }} trigger={['click']}>
			<Button type="text" icon={<GlobalOutlined />} aria-label={t('settings.language')}>
				{currentLanguage.toUpperCase()}
			</Button>
		</Dropdown>
	)
}
