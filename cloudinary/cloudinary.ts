interface ImageAsset {
	asset_id: string;
	public_id: string;
	format: "jpg" | "png" | "heic";
	version: number;
	resource_type: "image";
	type: "upload";
	bytes: number;
	width: number;
	height: number;
	secure_url: string;
}

const FAKE_DATA: ImageAsset[] = [
	{
		asset_id: "0bc266a5c13b32b7f391743e6190e64b",
		public_id: "wallpaper/My Wife",
		format: "png",
		version: 1727208372,
		resource_type: "image",
		type: "upload",
		bytes: 7298274,
		width: 7680,
		height: 4320,
		asset_folder: "wallpaper",
		display_name: "wtu9aapnvev6l3u4wxnn",
		url: "http://res.cloudinary.com/duyynotn0/image/upload/v1727208372/wallpaper/My%20Wife.png",
		secure_url:
			"https://res.cloudinary.com/duyynotn0/image/upload/v1727208372/wallpaper/My%20Wife.png",
		last_updated: {
			public_id_updated_at: "2024-09-24T21:10:00+00:00",
			updated_at: "2024-09-24T21:10:00+00:00",
		},
	},
	{
		asset_id: "054f3880e1b0ae0e1caf7353a3b5887f",
		public_id: "wallpaper/Lycoris Recoil",
		format: "jpg",
		version: 1727208371,
		resource_type: "image",
		type: "upload",
		bytes: 4393245,
		width: 3840,
		height: 2160,
		asset_folder: "wallpaper",
		display_name: "bcnwr6vgi6l7biqn10gx",
		url: "http://res.cloudinary.com/duyynotn0/image/upload/v1727208371/wallpaper/Lycoris%20Recoil.jpg",
		secure_url:
			"https://res.cloudinary.com/duyynotn0/image/upload/v1727208371/wallpaper/Lycoris%20Recoil.jpg",
		last_updated: {
			public_id_updated_at: "2024-09-24T21:10:07+00:00",
			updated_at: "2024-09-24T21:10:07+00:00",
		},
	},
	{
		asset_id: "c9f71873b584b74a5dce33c0a65319ac",
		public_id: "wallpaper/Tokyo",
		format: "jpg",
		version: 1727208369,
		resource_type: "image",
		type: "upload",
		created_at: "2024-09-24T20:06:09Z",
		bytes: 7752039,
		width: 6720,
		height: 4480,
		asset_folder: "wallpaper",
		display_name: "v59wmbyztuy3hpinwsgo",
		url: "http://res.cloudinary.com/duyynotn0/image/upload/v1727208369/wallpaper/Tokyo.jpg",
		secure_url:
			"https://res.cloudinary.com/duyynotn0/image/upload/v1727208369/wallpaper/Tokyo.jpg",
		last_updated: {
			public_id_updated_at: "2024-09-24T21:09:28+00:00",
			updated_at: "2024-09-24T21:09:28+00:00",
		},
	},
	{
		asset_id: "7ff8cb0616c8091dc37aadec52a30658",
		public_id: "wallpaper/Galaxy",
		format: "jpg",
		version: 1727208369,
		resource_type: "image",
		type: "upload",
		created_at: "2024-09-24T20:06:09Z",
		bytes: 4068457,
		width: 7042,
		height: 4699,
		asset_folder: "wallpaper",
		display_name: "xghgm5fp8icre4kmvsx5",
		url: "http://res.cloudinary.com/duyynotn0/image/upload/v1727208369/wallpaper/Galaxy.jpg",
		secure_url:
			"https://res.cloudinary.com/duyynotn0/image/upload/v1727208369/wallpaper/Galaxy.jpg",
		last_updated: {
			public_id_updated_at: "2024-09-24T21:09:13+00:00",
			updated_at: "2024-09-24T21:09:13+00:00",
		},
	},
	{
		asset_id: "8b1b17423a410a4b2f7bea13957f7de1",
		public_id: "wallpaper/Raydrop",
		format: "heic",
		version: 1727208361,
		resource_type: "image",
		type: "upload",
		created_at: "2024-09-24T20:06:01Z",
		bytes: 1034763,
		width: 6016,
		height: 3388,
		asset_folder: "wallpaper",
		display_name: "yjcsdlty4pwqaich0fl4",
		url: "http://res.cloudinary.com/duyynotn0/image/upload/v1727208361/wallpaper/Raydrop.heic",
		secure_url:
			"https://res.cloudinary.com/duyynotn0/image/upload/v1727208361/wallpaper/Raydrop.heic",
		last_updated: {
			public_id_updated_at: "2024-09-24T21:08:56+00:00",
			updated_at: "2024-09-24T21:08:56+00:00",
		},
	},
	{
		asset_id: "7d95c3294cd84e64b004f54a002d3865",
		public_id: "wallpaper/Alisa",
		format: "jpg",
		version: 1727208357,
		resource_type: "image",
		type: "upload",
		created_at: "2024-09-24T20:05:57Z",
		bytes: 1556534,
		width: 5120,
		height: 2880,
		asset_folder: "wallpaper",
		display_name: "qjbbkz8kn1rtsmvthdb5",
		url: "http://res.cloudinary.com/duyynotn0/image/upload/v1727208357/wallpaper/Alisa.jpg",
		secure_url:
			"https://res.cloudinary.com/duyynotn0/image/upload/v1727208357/wallpaper/Alisa.jpg",
		last_updated: {
			public_id_updated_at: "2024-09-24T21:08:48+00:00",
			updated_at: "2024-09-24T21:08:48+00:00",
		},
	},
];

export type { ImageAsset };
export { FAKE_DATA };
