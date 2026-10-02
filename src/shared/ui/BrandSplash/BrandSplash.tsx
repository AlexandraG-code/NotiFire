import { AnimatePresence, MotionConfig, motion } from 'motion/react'

import { AppIcon } from '../AppIcon/AppIcon'
import { SplashName } from '../SplashName/SplashName'

import styles from './BrandSplash.module.scss'
import { BRAND_NAME, FADE_SECONDS, ICON_FROM_SCALE, ICON_SECONDS } from './constants'
import type { BrandSplashProps } from './types'

/**
 * Заставка на весь экран: сначала по центру появляется иконка, затем справа по буквам выезжает название,
 * а иконка плавно сдвигается влево. Цвета берутся из темы, поэтому заставка светлая или тёмная вместе с приложением.
 * При включённом в системе «уменьшении движения» движение заменяется плавным появлением.
 * @param {boolean} visible - Показана ли заставка
 * @returns {JSX.Element} Заставка
 */
export const BrandSplash = ({ visible }: BrandSplashProps) => (
	<MotionConfig reducedMotion="user">
		<AnimatePresence>
			{visible && (
				<motion.div
					className={styles.splash}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: FADE_SECONDS }}
					role="status"
					aria-label={BRAND_NAME}
				>
					<motion.div
						className={styles.icon}
						initial={{ scale: ICON_FROM_SCALE, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: ICON_SECONDS, ease: 'easeOut' }}
					>
						<AppIcon />
					</motion.div>
					<SplashName text={BRAND_NAME} />
				</motion.div>
			)}
		</AnimatePresence>
	</MotionConfig>
)
