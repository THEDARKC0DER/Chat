import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="items-center justify-center flex-auto">
      <Stack.Screen options={{ headerShown: false }} />
      <Link href="./" className="text-blue-800 text-lg font-medium">
        GO back to Home Screen
      </Link>
    </View>
  );
}
