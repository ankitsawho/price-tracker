import { create } from "zustand";

const useUserStore = create((set) => ({
	user: null,
	addUser: (data) => set({ user: data }),
	wipeUser: () => set({ user: null }),
}));

export default useUserStore;
