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
	thumbnail_url: string;
	source_url?: string;
	creator_name?: string;
}

export type { ImageAsset };
