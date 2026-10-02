import { useTranslation } from 'react-i18next'

import { Namespace } from '@shared/i18n'
import { ChatBackground } from '@shared/ui'

import styles from './ChatPlaceholder.module.scss'

/**
 * Заглушка области диалога, пока чат не выбран: подсказка на фоне чата.
 * @returns {JSX.Element} Область с подсказкой
 */
export const ChatPlaceholder = () => {
	const { t } = useTranslation(Namespace.Chat)

	return (
		<ChatBackground>
			<div className={styles.empty}>{t('emptyChat')}</div>
		</ChatBackground>
	)
}
