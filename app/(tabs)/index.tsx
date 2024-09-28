import {
	View,
	Image,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
} from "react-native";

import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
		fetchWallpapers();
	}, []);

	async function fetchWallpapers() {
		try {
			setIsLoading(true);
			const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/wallpapers`);
			if (res.status !== 200) {
				throw new Error("server returned error response");
			}
			const images: ImageAsset[] = await res.json();
			setImages(images);
		} catch (err) {
			Alert.alert(
				"Unable to fetch wallpaper",
				"Check your internet connection. Otherwise, it's probably our fault.",
			);
		} finally {
			setIsLoading(false);
		}
	}

	function content() {
		if (isLoading) {
			return (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator />
				</View>
			);
		}

		if (images) {
			return (
				<MasonryFlashList
					data={images}
					numColumns={2}
					ListHeaderComponent={() => (
						<Text className="px-4 pt-20 pb-4 text-xl font-bold text-center dark:text-white">
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
										{item.display_name}
									</Text>
								</View>
							</View>
						</View>
					)}
					estimatedItemSize={200}
				/>
			);
		}

		return (
			<View className="flex-1 items-center justify-center">
				<TouchableOpacity
					onPress={() => {
						fetchWallpapers();
					}}
				>
					<View className="flex-col items-center justify-center space-y-2">
						<Ionicons name="refresh" size={24} color="white" />
						<Text className="text-white">Reload</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	return <View className="flex-1">{content()}</View>;
}
