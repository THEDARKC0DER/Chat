import { Slot, Stack } from "expo-router";
// Import your global CSS file
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Alert, Button, View } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Slot />
      </Stack>
    </SafeAreaProvider>
  );
}
