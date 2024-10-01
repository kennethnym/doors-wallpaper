import { useStore } from "@/store/store";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, View, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function WallpaperPage() {
	const selectedWallpaper = useStore((store) => store.selectedWallpaper);
	const [isDownloading, setIsDownloading] = useState(false);
	const router = useRouter();
	const safeArea = useSafeAreaInsets();

	if (!selectedWallpaper) {
		return null;
	}

	const imageName = selectedWallpaper.display_name;

	async function downloadWallpaper() {
		if (!selectedWallpaper) {
			return;
		}

		setIsDownloading(true);

		try {
			const permStatus = await MediaLibrary.requestPermissionsAsync(true, [
				"photo",
			]);
			if (permStatus.status != MediaLibrary.PermissionStatus.GRANTED) {
				Alert.alert(
					"Media library access required",
					"Doors need access to your media library in order to save wallpapers.",
				);
				return;
			}

			const result = await FileSystem.downloadAsync(
				selectedWallpaper.secure_url,
				`${FileSystem.documentDirectory}${selectedWallpaper.asset_id}.${selectedWallpaper.format}`,
			);
			await MediaLibrary.createAssetAsync(result.uri);
			Alert.alert(
				"Wallpaper saved successfully",
				"You can change the wallpaper in Settings.",
			);
		} catch {
			Alert.alert(
				"Unable to download wallpaper",
				"Check your internet connection. Otherwise, it's probably our fault.",
			);
		} finally {
			setIsDownloading(false);
		}
	}

	async function openSourceUrl() {
		if (selectedWallpaper?.source_url) {
			Linking.openURL(selectedWallpaper.source_url);
		}
	}

	return (
		<View className="flex-1 w-full h-full">
			<Image
				className="flex-1 w-full h-full"
				source={{ uri: selectedWallpaper.secure_url }}
			/>
			<SafeAreaView className="absolute top-0 left-0 right-0 flex-row px-4">
				<TouchableOpacity
					onPress={() => {
						router.dismiss();
					}}
				>
					<View
						className="w-8 h-8 rounded-full items-center justify-center"
						style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", padding: 5 }}
					>
						<Ionicons size={24} name="close" color="white" />
					</View>
				</TouchableOpacity>
			</SafeAreaView>
			<View
				className="absolute bottom-0 left-0 right-0 h-min w-full justify-between items-center px-8"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.8)",
					paddingTop: 24,
					paddingBottom: safeArea.bottom + 24,
				}}
			>
				{Boolean(selectedWallpaper.creator_name) ||
				Boolean(selectedWallpaper.source_url) ? (
					<View className="flex-col justify-center items-center mb-8">
						{selectedWallpaper.creator_name ? (
							<Text className="text-white text-center opacity-50 text-xs">
								{selectedWallpaper.creator_name}
								{selectedWallpaper.is_ai_generated ? " · AI Generated" : ""}
							</Text>
						) : null}
						{selectedWallpaper.source_url ? (
							<TouchableOpacity
								onPress={() => {
									openSourceUrl();
								}}
							>
								<Text className="text-white underline text-center opacity-50 text-xs">
									{selectedWallpaper.source_url}
								</Text>
							</TouchableOpacity>
						) : null}
					</View>
				) : null}
				<TouchableOpacity
					disabled={isDownloading}
					className="w-full"
					onPress={() => {
						if (!isDownloading) {
							downloadWallpaper();
						}
					}}
				>
					<View
						className="w-full rounded justify-center items-center px-4 py-1"
						style={{
							backgroundColor: "#E5202B",
						}}
					>
						<Text className="text-white">
							{isDownloading ? "Downloading…" : "Download"}
						</Text>
						<Text className="text-white opacity-80 text-xs">
							{selectedWallpaper.width}x{selectedWallpaper.height}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
