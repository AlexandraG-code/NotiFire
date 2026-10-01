export const RECEIVE_TIMEOUT_SECONDS = Number(window._env_.NOTIFICATION_RECEIVE_TIMEOUT_S)
export const RETRY_DELAY_MS = Number(window._env_.NOTIFICATION_RETRY_DELAY_MS)

/** Подтверждение отправки может прийти раньше, чем сообщение получит идентификатор API, поэтому поиск повторяется. */
export const LINK_ATTEMPTS = 5
export const LINK_RETRY_DELAY_MS = 1000
