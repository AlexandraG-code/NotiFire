import { ChatBackground } from '@shared/ui'

import styles from './EmptyChat.module.scss'

/**
 * Заглушка, пока чат не выбран.
 * @returns {JSX.Element} Область с подсказкой
 */
export const EmptyChat = () => (
	<ChatBackground>
		<div className={styles.empty}>Выберите чат или создайте новый</div>
	</ChatBackground>
)
