import { Avatar } from 'antd'

import styles from './ChatAvatar.module.scss'
import type { ChatAvatarProps } from './types'

const DEFAULT_SIZE = 56
const INITIAL_SKIP = /[+\s]/g

/**
 * Круглый аватар чата с первым символом названия.
 * @param {string} title - Название чата, из него берётся первая буква
 * @param {string} [src] - Ссылка на фото собеседника; без неё или при ошибке загрузки показывается буква
 * @param {number} [size=56] - Диаметр аватара в пикселях
 * @returns {JSX.Element} Аватар
 */
export const ChatAvatar = ({ title, src, size = DEFAULT_SIZE }: ChatAvatarProps) => (
	<Avatar className={styles.avatar} size={size} src={src || undefined}>
		{title.replace(INITIAL_SKIP, '').charAt(0).toUpperCase()}
	</Avatar>
)
