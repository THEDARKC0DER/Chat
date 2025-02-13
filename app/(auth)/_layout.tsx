import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Login" }} />
      {/* <Stack.Screen name="phone-input" options={{ title: "Phone Number" }} /> */}
      <Stack.Screen name="signUp" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
