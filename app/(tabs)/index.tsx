import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
}
