import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Skin } from '@shared/theme'

import { SKIN_STORAGE_KEY } from './constants'

interface SkinState {
	skin: Skin
}

interface SkinActions {
	setSkin: (skin: Skin) => void
}

/** Стор оформления: выбранный мессенджер определяет скин и хранится в localStorage. */
export const useSkinStore = create<SkinState & SkinActions>()(
	persist(
		(set) => ({
			skin: Skin.Max,
			setSkin: (skin) => set({ skin })
		}),
		{ name: SKIN_STORAGE_KEY, partialize: ({ skin }) => ({ skin }) }
	)
)
