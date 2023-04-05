import { create } from "zustand";

const useDetailStore = create((set) => ({
	showDetails: false,
	details: {},
	toggleShowDetails: () =>
		set((state) => ({ showDetails: !state.showDetails })),
	addDetails: (data) => set({ details: data }),
	wipeData: () => set({ details: {} }),
}));

export default useDetailStore;
