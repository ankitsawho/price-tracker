import { create } from "zustand";

const useSearchStore = create((set) => ({
	searchResults: [],
	addSearchData: (data) => set({ searchResults: data }),
	wipeData: () => set({ searchResults: [] }),
}));

export default useSearchStore;
