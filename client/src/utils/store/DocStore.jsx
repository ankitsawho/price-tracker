import { create } from "zustand";

const useDocStore = create((set) => ({
	doc: null,
	changeDoc: (data) => set({ doc: data }),
	wipeDoc: () => set({ doc: null }),
}));

export default useDocStore;
