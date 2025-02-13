import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

import auth, { signInWithPhoneNumber } from "@react-native-firebase/auth";

export default function OTPVerification() {
  const router = useRouter();

  const { phone, confirmId } = useLocalSearchParams();
  const [verificatonId, setVerificationId] = useState(confirmId);
  const [resendCooldown, setResendCooldown] = useState<number>(30);
  const [resendLoading, setResendLoading] = useState(false);

  const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    console.log(resendCooldown)

  async function confirmOtp() {
    if (!verificatonId) {
      console.log(verificatonId);
      Alert.alert("Error", "Invalid verification ID.");
      return;
    }
    setLoading(true);
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificatonId as string,
        otp
      );
      await auth().signInWithCredential(credential);
      router.replace("/");
    } catch (e: any) {
      Alert.alert("Otp verificaiton failed", e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    if (resendCooldown > 0) return;
    setResendLoading(true);

    try {
      const confirmation = await auth().signInWithPhoneNumber(phone as string);
      setVerificationId(confirmation.verificationId || "");
      Alert.alert("OTP Sent", "A new OTP has been sent to your phone.");

      setResendCooldown(30);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setResendLoading(false);
    }
  }

    useEffect(() => {
      
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [resendCooldown]); // Re-run when resendCooldown changes

  return (
    <View>
      <Text>Enter OTP sent to {phone}</Text>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        inputMode="numeric"
        maxLength={6}
      />
      <Button title="Verify OTP" onPress={confirmOtp} disabled={loading} />

      <View style={{ marginTop: 20 }}>
        <Text>
          {resendCooldown > 0
            ? `Resend OTP in ${resendCooldown}s`
            : "Didn't receive OTP?"}
        </Text>
        <Button
          title="Resend OTP"
          onPress={handleResendOtp}
          disabled={resendCooldown > 0 || resendLoading}
        />
      </View>
    </View>
  );
}
