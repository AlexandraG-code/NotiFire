import { Card, Flex, Typography } from 'antd'

import type { CenteredCardLayoutProps } from '../lib/types'

import styles from './CenteredCardLayout.module.scss'

/**
 * Раскладка страницы: карточка по центру экрана с заголовком, подзаголовком и содержимым.
 * Подходит для входа, регистрации и подключения интеграций; сама ничего не знает о содержимом.
 * @param {string} title - Заголовок карточки
 * @param {string} [subtitle] - Подзаголовок под заголовком
 * @param {ReactNode} [logo] - Логотип над заголовком
 * @param {ReactNode} [controls] - Элементы управления в правом верхнем углу страницы
 * @param {ReactNode} children - Содержимое карточки
 * @returns {JSX.Element} Страница с карточкой по центру
 */
export const CenteredCardLayout = ({ title, subtitle, controls, logo, children }: CenteredCardLayoutProps) => (
	<Flex className={styles.page} align="center" justify="center">
		{controls && (
			<Flex className={styles.controls} gap="small">
				{controls}
			</Flex>
		)}
		<Card className={styles.card}>
			<Flex className={styles.header} vertical align="center">
				{logo && <div className={styles.logo}>{logo}</div>}

				<Typography.Title level={2} className={styles.title}>
					{title}
				</Typography.Title>

				{subtitle && <Typography.Text type="secondary">{subtitle}</Typography.Text>}
			</Flex>
			{children}
		</Card>
	</Flex>
)
