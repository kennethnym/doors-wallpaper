import { useStore } from "@/store/store";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WallpaperPage() {
	const selectedWallpaper = useStore((store) => store.selectedWallpaper);
	const router = useRouter();

	if (!selectedWallpaper) {
		return null;
	}

	const imageName = selectedWallpaper.public_id.replace("wallpaper/", "");

	async function downloadWallpaper() {
		if (!selectedWallpaper) {
			return;
		}

		const permStatus = await MediaLibrary.requestPermissionsAsync();
		if (permStatus.status != MediaLibrary.PermissionStatus.GRANTED) {
			Alert.alert(
				"Media library access required",
				"Doors need access to your media library in order to save wallpapers.",
			);
			return;
		}

		console.log(
			`${FileSystem.documentDirectory}${selectedWallpaper.asset_id}.${selectedWallpaper.format}`,
		);

		const result = await FileSystem.downloadAsync(
			selectedWallpaper.secure_url,
			`${FileSystem.documentDirectory}${selectedWallpaper.asset_id}.${selectedWallpaper.format}`,
		);
		await MediaLibrary.createAssetAsync(result.uri);
		Alert.alert(
			"Wallpaper saved successfully",
			"You can change the wallpaper in Settings.",
		);
	}

	return (
		<View className="flex-1 w-full h-full">
			<Image
				className="flex-1 w-full h-full"
				source={{ uri: selectedWallpaper.secure_url }}
			/>
			<View className="absolute top-0 left-0 right-0 flex-row px-4 py-8">
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
			</View>
			<View className="absolute bottom-0 left-0 right-0 h-1/3 w-full bg-neutral-800 justify-between items-center p-8">
				<Text className="font-bold text-2xl text-white">{imageName}</Text>
				<TouchableOpacity
					className="w-full"
					onPress={() => {
						downloadWallpaper();
					}}
				>
					<View
						className="w-full rounded justify-center items-center p-4"
						style={{
							backgroundColor: "#E5202B",
						}}
					>
						<Text className="text-white">Download</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
