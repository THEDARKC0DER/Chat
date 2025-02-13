import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const router = useRouter();

  return (
    <SafeAreaView className="flex-auto items-center justify-center">
      <View>
        <TextInput placeholder="email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" />
        {/* <Button
          title="Phone Number"
          onPress={() => router.push("/(auth)/phone-input")}
        /> */}
        <Button title="Sign Up" onPress={() => router.push("/(auth)/signUp")} />
      </View>
    </SafeAreaView>
  );
}
