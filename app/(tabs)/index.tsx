import {
	View,
	Image,
	StyleSheet,
	Platform,
	Text,
	TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { FAKE_DATA, type ImageAsset } from "@/cloudinary/cloudinary";
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
			setIsLoading(true);
			const res = await fetch("http://localhost:8080/wallpapers");
			const images: ImageAsset[] = await res.json();
			setImages(images);
			setIsLoading(false);
		}
		fetchWallpapers();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<MasonryFlashList
				data={FAKE_DATA}
				numColumns={2}
				ListHeaderComponent={() => (
					<Text
						style={{
							paddingHorizontal: 8,
							paddingTop: 40,
							fontSize: 40,
							fontWeight: "bold",
							color: "white",
						}}
					>
						Wallpapers
					</Text>
				)}
				renderItem={({ item, target }) => (
					<View style={{ width: "100%", position: "relative" }}>
						<TouchableOpacity
							onPress={() => {
								setSelectedWallpaper(item);
								router.push("/wallpaper");
							}}
						>
							<Image
								style={{ width: "100%", height: 300, margin: 8 }}
								source={{ uri: item.secure_url }}
							/>
						</TouchableOpacity>
						<View
							style={{
								width: "100%",
								backgroundColor: "rgba(0, 0, 0, 0.8)",
								position: "absolute",
								bottom: 0,
								left: 0,
								right: 0,
								padding: 16,
							}}
						>
							<Text style={{ color: "white" }}>
								{item.public_id.replace("wallpaper/", "")}
							</Text>
						</View>
					</View>
				)}
				estimatedItemSize={200}
			/>
		</View>
	);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
			headerImage={
				<Image
					source={require("@/assets/images/partial-react-logo.png")}
					style={styles.reactLogo}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Welcome!</ThemedText>
				<HelloWave />
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 1: Try it</ThemedText>
				<ThemedText>
					Edit{" "}
					<ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
					to see changes. Press{" "}
					<ThemedText type="defaultSemiBold">
						{Platform.select({ ios: "cmd + d", android: "cmd + m" })}
					</ThemedText>{" "}
					to open developer tools.
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 2: Explore</ThemedText>
				<ThemedText>
					Tap the Explore tab to learn more about what's included in this
					starter app.
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
				<ThemedText>
					When you're ready, run{" "}
					<ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
					to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
					directory. This will move the current{" "}
					<ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
					<ThemedText type="defaultSemiBold">app-example</ThemedText>.
				</ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
