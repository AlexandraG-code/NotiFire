import { create } from 'zustand'

interface ChatSyncState {
	syncing: Record<string, boolean>
}

interface ChatSyncActions {
	setSyncing: (chatId: string, isSyncing: boolean) => void
}

/** Стор синхронизации: какие чаты сейчас догружают профиль и историю (в хранилище браузера не пишется). */
export const useChatSyncStore = create<ChatSyncState & ChatSyncActions>()((set) => ({
	syncing: {},
	setSyncing: (chatId, isSyncing) => set((state) => ({ syncing: { ...state.syncing, [chatId]: isSyncing } }))
}))
