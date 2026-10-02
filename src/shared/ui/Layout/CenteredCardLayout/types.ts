import type { PropsWithChildren, ReactNode } from 'react'

export interface CenteredCardLayoutProps extends PropsWithChildren {
	title: string
	subtitle?: string
	/** Элементы управления в правом верхнем углу страницы (переключатели языка и темы и т.п.). */
	controls?: ReactNode
}
