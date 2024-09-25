import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";

export default function AboutPage() {
	return (
		<SafeAreaView className="flex-1 items-start p-4">
			<Text className="pt-20 text-4xl font-bold text-white mb-4">About</Text>
			<View className="flex-col">
				<AboutItem
					title="Source Code"
					description="Source code is available on GitHub"
					onPress={() => {
						Linking.openURL("https://github.com/kennethnym/doors-wallpaper");
					}}
				/>
				<AboutItem
					title="Request wallpaper"
					description="Request wallpaper through my email"
					onPress={() => {
						Linking.openURL("mailto:kennethnym@outlook.com");
					}}
				/>
				<AboutItem
					title="Find me on X (formerly Twitter)"
					description="@kennethnym"
					onPress={() => {
						Linking.openURL("https://x.com/kennethnym");
					}}
				/>
				<AboutItem
					title="Find me on GitHub"
					description="@kennethnym"
					onPress={() => {
						Linking.openURL("https://github.com/kennethnym");
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

function AboutItem({
	title,
	description,
	onPress,
}: { title: string; description: string; onPress: () => void }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View className="flex-col items-start pb-3">
				<Text className="text-lg font-bold text-white">{title}</Text>
				<Text className="text-white opacity-50">{description}</Text>
			</View>
		</TouchableOpacity>
	);
}
