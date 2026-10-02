import type { PropsWithChildren, ReactNode } from 'react'

/**
 * Свойства раскладки из двух панелей.
 * @property {ReactNode} sidebar - Боковая панель
 * @property {boolean} isContentOpen - Открыто ли содержимое справа; в узком окне от этого зависит, что видно: панель
 * или содержимое
 */
export interface SidebarLayoutProps extends PropsWithChildren {
	sidebar: ReactNode
	isContentOpen: boolean
}
