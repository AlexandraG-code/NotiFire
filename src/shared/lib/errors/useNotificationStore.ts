import { create } from 'zustand'

import type { ErrorReport, NotificationItem } from './types'

interface NotificationState {
	/** Очередь ошибок, которые ещё не показали пользователю. */
	items: NotificationItem[]
}

interface NotificationActions {
	/** Единая точка сообщения об ошибках: пишет в консоль и ставит ошибку в очередь на показ. */
	notifyError: (report: ErrorReport) => void
	/** Убирает ошибку из очереди после показа. */
	dismiss: (id: string) => void
}

/** Стор уведомлений: другие сторы сообщают об ошибках сюда, а показывает их один компонент (ErrorNotifier). */
export const useNotificationStore = create<NotificationState & NotificationActions>((set) => ({
	items: [],
	notifyError: (report) => {
		console.error(report.title, report.cause ?? report.description)
		set((state) => ({ items: [...state.items, { ...report, id: crypto.randomUUID() }] }))
	},
	dismiss: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) }))
}))
