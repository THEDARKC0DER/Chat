import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="tab2" />
      <Tabs.Screen name="tab3" />
    </Tabs>
  );
}
