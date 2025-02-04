import { create } from 'zustand'

export const useOpenfortStore = create((set) => ({
    authToken: null,
    setAuthToken: (authToken) => set({ authToken:authToken }),
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}))