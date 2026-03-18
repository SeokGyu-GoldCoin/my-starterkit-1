import { create } from 'zustand'

interface UIState {
  // 사이드 패널
  isSidePanelOpen: boolean
  toggleSidePanel: () => void
  setSidePanelOpen: (open: boolean) => void

  // 활성 탭
  activeTab: 'layers' | 'search' | 'detail'
  setActiveTab: (tab: 'layers' | 'search' | 'detail') => void

  // 로딩 상태
  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  // 에러 메시지
  error: string | null
  setError: (error: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  // 사이드 패널
  isSidePanelOpen: true,
  toggleSidePanel: () =>
    set((state) => ({
      isSidePanelOpen: !state.isSidePanelOpen,
    })),
  setSidePanelOpen: (open) => set({ isSidePanelOpen: open }),

  // 활성 탭
  activeTab: 'layers',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // 로딩 상태
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // 에러 메시지
  error: null,
  setError: (error) => set({ error }),
}))
