import { redirect } from 'react-router-dom'

import { useAuthStore } from '@features/Auth'

import { AppRoute } from '@shared/config'

/**
 * Loader: неавторизованных отправляет на страницу входа.
 * @returns {Response | null} Редирект на /login или null, если доступ разрешён
 */
export const requireAuth = () => (useAuthStore.getState().isAuthorized ? null : redirect(AppRoute.Login))

/**
 * Loader: авторизованных уводит со страницы входа на главную.
 * @returns {Response | null} Редирект на главную или null, если пользователь не авторизован
 */
export const redirectIfAuth = () => (useAuthStore.getState().isAuthorized ? redirect(AppRoute.Root) : null)
