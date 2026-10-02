import type { ReactNode } from 'react'

/**
 * Свойства боковой панели чатов.
 * @property {ReactNode} [footer] - Нижний блок панели; передаётся страницей, чтобы виджеты не зависели друг от друга
 */
export interface ChatSidebarProps {
	footer?: ReactNode
}
