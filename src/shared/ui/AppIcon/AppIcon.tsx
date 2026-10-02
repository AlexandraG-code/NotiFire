import styles from './AppIcon.module.scss'
import baseSrc from './assets/icon-base.png'
import flameSrc from './assets/icon-flame.png'

/** Положение и размер огня на иконке в координатах 512 × 512 (вырезан из исходного рисунка). */
const FLAME = { x: 294, y: 68, width: 121, height: 289 }
const ICON_SIZE = 512

/**
 * Иконка NotiFire: исходный рисунок, на котором огонь вырезан в отдельный слой и колышется
 * (анимация отключается при prefers-reduced-motion).
 * @returns {JSX.Element} SVG-иконка размером 1em
 */
export const AppIcon = () => (
	<svg className={styles.icon} viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`} width="1em" height="1em" aria-hidden>
		<image href={baseSrc} width={ICON_SIZE} height={ICON_SIZE} />
		<image className={styles.flame} href={flameSrc} {...FLAME} />
		<image className={styles.glow} href={flameSrc} {...FLAME} />
	</svg>
)
