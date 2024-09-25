import {
	View,
	Image,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
} from "react-native";

import { useEffect, useState } from "react";
import { type ImageAsset } from "@/cloudinary/cloudinary";
import { MasonryFlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useStore } from "@/store/store";

export default function HomeScreen() {
	const router = useRouter();
	const setSelectedWallpaper = useStore((store) => store.setSelectedWallpaper);
	const [images, setImages] = useState<ImageAsset[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchWallpapers() {
			try {
				setIsLoading(true);
				const res = await fetch(
					`${process.env.EXPO_PUBLIC_API_URL}/wallpapers`,
				);
				const images: ImageAsset[] = await res.json();
				setImages(images);
				setIsLoading(false);
			} catch {
				Alert.alert(
					"Unable to fetch wallpaper",
					"Check your internet connection. Otherwise, it's probably our fault.",
				);
			}
		}
		fetchWallpapers();
	}, []);

	return (
		<View className="flex-1">
			{isLoading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator />
				</View>
			) : (
				<MasonryFlashList
					data={images}
					numColumns={2}
					ListHeaderComponent={() => (
						<Text className="px-2 pt-20 text-2xl font-bold text-white">
							Wallpapers
						</Text>
					)}
					renderItem={({ item }) => (
						<View className="w-full p-2">
							<View className="w-full relative rounded overflow-hidden">
								<TouchableOpacity
									onPress={() => {
										setSelectedWallpaper(item);
										router.push("/wallpaper");
									}}
								>
									<Image
										className="w-full h-60"
										source={{ uri: item.thumbnail_url }}
									/>
								</TouchableOpacity>
								<View
									className="w-full absolute bottom-0 left-0 right-0 p-2"
									style={{
										backgroundColor: "rgba(0, 0, 0, 0.8)",
									}}
								>
									<Text className="text-white opacity-80">
										{item.public_id.replace("wallpaper/", "")}
									</Text>
								</View>
							</View>
						</View>
					)}
					estimatedItemSize={200}
				/>
			)}
		</View>
	);
}
