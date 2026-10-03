import { motion } from 'motion/react'

import {
	LETTER_SECONDS,
	LETTER_SHIFT_PX,
	LETTER_STAGGER_SECONDS,
	NAME_DELAY_SECONDS,
	NAME_OPEN_SECONDS,
	NAME_PADDING_PX
} from '../lib/constants'
import type { SplashNameProps } from '../lib/types'

import styles from './SplashName.module.scss'

/**
 * Надпись заставки: раскрывается вправо по ширине, а буквы по очереди выезжают слева.
 * @param {string} text - Текст надписи
 * @returns {JSX.Element} Анимированная надпись
 */
export const SplashName = ({ text }: SplashNameProps) => (
	<motion.div
		className={styles.name}
		initial={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
		animate={{ width: 'auto', paddingLeft: NAME_PADDING_PX, paddingRight: NAME_PADDING_PX }}
		transition={{ delay: NAME_DELAY_SECONDS, duration: NAME_OPEN_SECONDS, ease: 'easeInOut' }}
		aria-hidden
	>
		{[...text].map((letter, index) => (
			<motion.span
				key={index}
				className={styles.letter}
				initial={{ x: LETTER_SHIFT_PX, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{
					delay: NAME_DELAY_SECONDS + index * LETTER_STAGGER_SECONDS,
					duration: LETTER_SECONDS,
					ease: 'easeOut'
				}}
			>
				{letter}
			</motion.span>
		))}
	</motion.div>
)
