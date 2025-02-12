import { Slot, Tabs, useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function TabsLayout() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [user, setUser] = useState<any>(true);

  useEffect(() => {
    if (navigationState?.key && !user) {
      router.replace("/(auth)/login");
    }
  }, [user, navigationState]);

  if (!navigationState?.key) {
    return (
      <View>
        <Text>Checking authentication...</Text>
      </View>
    );
  }
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="tab2" />
      <Tabs.Screen name="tab3" />
      <Slot />
    </Tabs>
  );
}
