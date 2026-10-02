import type { Namespace } from './enums'
import i18n from './i18n'

/**
 * Подгружает пространства имён для текущего языка. Уже загруженные повторно не запрашиваются.
 * Вызывается при открытии страницы, чтобы её тексты были готовы к первому рендеру.
 * @param {Namespace[]} namespaces - Нужные пространства
 * @returns {Promise<void>} Разрешается, когда файлы переводов загружены
 */
export const loadNamespaces = (...namespaces: Namespace[]): Promise<void> => i18n.loadNamespaces(namespaces)
