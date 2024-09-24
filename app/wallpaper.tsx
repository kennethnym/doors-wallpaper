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
		<SafeAreaView style={{ flex: 1, width: "100%", height: "100%" }}>
			<Image
				style={{ flex: 1, width: "100%", height: "100%" }}
				source={{ uri: selectedWallpaper.secure_url }}
			/>
			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					flexDirection: "row",
					paddingHorizontal: 16,
					paddingVertical: 32,
				}}
			>
				<TouchableOpacity
					onPress={() => {
						router.dismiss();
					}}
				>
					<View
						style={{
							width: 32,
							height: 32,
							borderRadius: 16,
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							alignItems: "center",
							justifyContent: "center",
							padding: 5,
						}}
					>
						<Ionicons size={24} name="close" color="white" />
					</View>
				</TouchableOpacity>
			</View>
			<View
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: "30%",
					width: "100%",
					backgroundColor: "#0A0A0A",
					justifyContent: "space-between",
					alignItems: "center",
					padding: 24,
				}}
			>
				<Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>
					{imageName}
				</Text>
				<TouchableOpacity
					style={{ width: "100%" }}
					onPress={() => {
						downloadWallpaper();
					}}
				>
					<View
						style={{
							width: "100%",
							borderRadius: 8,
							backgroundColor: "#E5202B",
							justifyContent: "center",
							alignItems: "center",
							padding: 8,
						}}
					>
						<Text style={{ color: "white" }}>Download</Text>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
