import type { ImageAsset } from "@/cloudinary/cloudinary";
import { create } from "zustand";

interface Store {
	selectedWallpaper: ImageAsset | null;
	setSelectedWallpaper(image: ImageAsset): void;
}

const useStore = create<Store>((set) => ({
	selectedWallpaper: null,

	setSelectedWallpaper: (image) =>
		set((store) => ({ ...store, selectedWallpaper: image })),
}));

export { useStore };
