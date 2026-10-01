import { AuthForm } from '@features/Auth'
import { ThemeSwitch } from '@features/Theme'

import styles from './AuthPage.module.css'

/**
 * Страница входа: карточка с формой и переключатель темы.
 * @returns {JSX.Element} Страница авторизации
 */
export const AuthPage = () => (
	<div className={styles.page}>
		<div className={styles.theme}>
			<ThemeSwitch />
		</div>
		<div className={styles.card}>
			<h1 className={styles.title}>Вход</h1>
			<p className={styles.subtitle}>Данные инстанса из консоли GREEN-API</p>
			<AuthForm />
		</div>
	</div>
)
