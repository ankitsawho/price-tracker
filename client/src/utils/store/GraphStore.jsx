import { create } from "zustand";

const useGraphStore = create((set) => ({
	data: null,
	addData: (item) => set({ data: [...data, item] }),
	wipeData: () => set({ data: null }),
}));

export default useGraphStore;
