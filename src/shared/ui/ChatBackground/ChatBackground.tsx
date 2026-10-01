import styles from './ChatBackground.module.css'
import type { ChatBackgroundProps } from './types'

/**
 * Компонент для отрисовки фона области чата: градиент темы с узором поверх, занимает всё свободное место по ширине.
 * @param {string} [className] - Дополнительный CSS-класс корневого элемента
 * @param {ReactNode} children - Содержимое области чата
 * @returns {JSX.Element} Область чата с фоном
 */
export const ChatBackground = ({ className, children }: ChatBackgroundProps) => (
	<div className={className ? `${styles.background} ${className}` : styles.background}>{children}</div>
)
