import { Avatar } from 'antd'

import { AvatarSize } from '../model/enums'
import type { ChatAvatarProps } from '../model/types'

import styles from './ChatAvatar.module.scss'

const INITIAL_SKIP = /[+\s]/g

/**
 * Круглый аватар чата с первым символом названия. Диаметр задаётся размером из общих SCSS-переменных.
 * @param {string} title - Название чата, из него берётся первая буква
 * @param {string} [src] - Ссылка на фото собеседника; без неё или при ошибке загрузки показывается буква
 * @param {AvatarSize} [size=AvatarSize.Large] - Размер аватара
 * @returns {JSX.Element} Аватар
 */
export const ChatAvatar = ({ title, src, size = AvatarSize.Large }: ChatAvatarProps) => (
	<Avatar className={styles.avatar} data-size={size} src={src || undefined}>
		{title.replace(INITIAL_SKIP, '').charAt(0).toUpperCase()}
	</Avatar>
)
