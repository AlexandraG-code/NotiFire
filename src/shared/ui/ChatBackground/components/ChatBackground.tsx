import type { ChatBackgroundProps } from '../lib/types'

import styles from './ChatBackground.module.scss'

/**
 * Компонент для отрисовки фона области чата: градиент темы с узором поверх, занимает всё свободное место по ширине.
 * @param {string} [className] - Дополнительный CSS-класс корневого элемента
 * @param {ReactNode} children - Содержимое области чата
 * @returns {JSX.Element} Область чата с фоном
 */
export const ChatBackground = ({ className, children }: ChatBackgroundProps) => (
	<div className={className ? `${styles.background} ${className}` : styles.background}>{children}</div>
)
