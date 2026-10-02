import styles from './CenteredCardLayout.module.scss'
import type { CenteredCardLayoutProps } from './types'

/**
 * Раскладка страницы: карточка по центру экрана с заголовком, подзаголовком и содержимым.
 * Подходит для входа, регистрации и подключения интеграций; сама ничего не знает о содержимом.
 * @param {string} title - Заголовок карточки
 * @param {string} [subtitle] - Подзаголовок под заголовком
 * @param {ReactNode} [controls] - Элементы управления в правом верхнем углу страницы
 * @param {ReactNode} children - Содержимое карточки
 * @returns {JSX.Element} Страница с карточкой по центру
 */
export const CenteredCardLayout = ({ title, subtitle, controls, children }: CenteredCardLayoutProps) => (
	<div className={styles.page}>
		{controls && <div className={styles.controls}>{controls}</div>}
		<div className={styles.card}>
			<h1 className={styles.title}>{title}</h1>
			{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
			{children}
		</div>
	</div>
)
