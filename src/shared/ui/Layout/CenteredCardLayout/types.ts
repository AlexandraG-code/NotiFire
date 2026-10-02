import type { PropsWithChildren, ReactNode } from 'react'

/**
 * Свойства раскладки с карточкой по центру.
 * @property {string} title - Заголовок карточки
 * @property {string} [subtitle] - Подзаголовок под заголовком
 * @property {ReactNode} [controls] - Элементы управления в правом верхнем углу страницы (переключатели языка и темы и
 * т.п.)
 */
export interface CenteredCardLayoutProps extends PropsWithChildren {
	title: string
	subtitle?: string
	controls?: ReactNode
}
