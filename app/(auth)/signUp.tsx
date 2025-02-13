import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from '@react-native-firebase/database'

export default function SignUp() {
  const [name,setName]=useState<string|undefined>()
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const router = useRouter();

  const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
    db().ref(`/users/${response.user.uid}`).set({name})
    // db().ref(`/users/${response.user.uid}`).set({name})
  };

  const registerAndGoTHome = async () => {
    try {
      if (email && password) {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        if (response.user) {
          await createProfile(response);
          router.replace("/");
        }
      }
    } catch (e: any) {
      console.log(e);
      Alert.alert("Opps", "Try Again");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput placeholder="Name" value={name} onChangeText={setName} />
        <TextInput placeholder="email" value={email} onChangeText={setEmail} inputMode="email" autoCapitalize="none"/>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="SignUp" onPress={registerAndGoTHome}/>
      </View>
    </SafeAreaView>
  );
}
