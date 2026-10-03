import { AppIcon } from '../../AppIcon'

import styles from './AppLogo.module.scss'

/**
 * Логотип приложения: анимированная иконка NotiFire без надписи.
 * @returns {JSX.Element} Логотип
 */
export const AppLogo = () => (
	<span className={styles.logo} role="img" aria-label="NotiFire">
		<AppIcon />
	</span>
)
