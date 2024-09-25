import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Wallpaper",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "albums" : "albums-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="about"
				options={{
					title: "About",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={
								focused ? "information-circle" : "information-circle-outline"
							}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
