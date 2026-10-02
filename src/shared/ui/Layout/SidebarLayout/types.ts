import type { PropsWithChildren, ReactNode } from 'react'

export interface SidebarLayoutProps extends PropsWithChildren {
	sidebar: ReactNode
	/** Открыто ли содержимое справа; в узком окне от этого зависит, что видно: панель или содержимое. */
	isContentOpen: boolean
}
