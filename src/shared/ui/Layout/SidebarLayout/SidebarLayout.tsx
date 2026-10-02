import styles from './SidebarLayout.module.scss'
import type { SidebarLayoutProps } from './types'

/**
 * Раскладка из двух панелей: боковая слева и содержимое справа. В узком окне показывается что-то одно:
 * панель, пока содержимое не открыто, и содержимое, когда оно открыто.
 * @param {ReactNode} sidebar - Боковая панель
 * @param {boolean} isContentOpen - Открыто ли содержимое
 * @param {ReactNode} children - Содержимое справа
 * @returns {JSX.Element} Две панели на всю высоту экрана
 */
export const SidebarLayout = ({ sidebar, isContentOpen, children }: SidebarLayoutProps) => (
	<div className={styles.layout} data-content-open={isContentOpen}>
		<div className={styles.sidebarPane}>{sidebar}</div>
		<div className={styles.contentPane}>{children}</div>
	</div>
)
