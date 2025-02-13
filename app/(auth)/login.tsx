import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import auth from "@react-native-firebase/auth";

export default function LoginScreen() {
  const [input, setInput] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");

  const [step, setStep] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleInputChange = (text: string) => {
    setInput(text);
    setIsEmail(isValidEmail(text));
  };

  const handleNext = async () => {
    if (isEmail) {
      setLoading(true);
      try {
        const signInMethods = await auth().fetchSignInMethodsForEmail(input);
        setLoading(false);
        if (signInMethods.length > 0) {
          setStep(2);
        } else {
          Alert.alert("User Not Found", "Would you like to register instead?", [
            { text: "Cancel", style: "cancel" },
            { text: "Register", onPress: () => router.push("/signUp") },
          ]);
        }
      } catch (e: any) {
        setLoading(false);
        Alert.alert("Error", e.message);
      }
    } else if (isValidPhoneNumber(input)) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(input);
        router.push({
          pathname: "/otp-verification",
          params: { phone: input, confirmId: confirmation.verificationId },
        });
      } catch (e: any) {
        Alert.alert("Error", e.message);
      }
    } else {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid email or phone number."
      );
    }
  };

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(input, password);
      router.replace("/");
    } catch (e: any) {
      Alert.alert("Login Failed", e.message);
    }
  };

  return (
    <SafeAreaView className="flex-auto items-center justify-center">
      <View>
        {step === 1 && (
          <>
            <TextInput
              placeholder="Enter email or phone"
              value={input}
              onChangeText={handleInputChange}
              autoCapitalize="none"
              keyboardType={isEmail ? "email-address" : "phone-pad"}
              returnKeyType="done"
              onSubmitEditing={handleNext}
            />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button title="Next" onPress={handleNext} />
            )}
          </>
        )}

        {step === 2 && isEmail && (
          <>
            <TextInput
              placeholder="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
          </>
        )}
        <Button title="Sign Up" onPress={() => router.push("/signUp")} />
      </View>
    </SafeAreaView>
  );
}

//
// VALIDATION FUNCITONS
// checks if text is a valod email
const isValidEmail = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
//checks if text is a valid number
const isValidPhoneNumber = (text: string) => /^\+?\d{10,15}$/.test(text);
//
