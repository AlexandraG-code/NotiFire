/**
 * Свойства аватара чата.
 * @property {string} title - Название чата, из него берётся первая буква
 * @property {string} [src] - Ссылка на фото; если пусто или не загрузилось, показывается первая буква названия
 * @property {number} [size] - Диаметр аватара в пикселях
 */
export interface ChatAvatarProps {
	title: string
	src?: string
	size?: number
}
