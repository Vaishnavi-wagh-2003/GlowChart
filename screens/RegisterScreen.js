import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Enter a valid email address");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({ email, password })
      );
      Alert.alert("Success", "Account created! Please login.");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Join The Glow!</Text>
      </View>

      {/* Inputs */}
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <MaterialIcons name="email" size={20} color="#999" style={styles.icon} />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Ionicons name="eye-off" size={20} color="#999" style={styles.icon} />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
        <Ionicons name="eye-off" size={20} color="#999" style={styles.icon} />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Already a Member?{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("Login")}
        >
          Log In
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFEDE8", padding: 20 },

  headerBox: {
    backgroundColor: "#F1B0B0",
    padding: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  headerText: { fontSize: 22, fontWeight: "700", color: "#822E2E" },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    elevation: 2,
  },
  input: { flex: 1, padding: 12 },
  icon: { marginLeft: 5 },

  button: {
    backgroundColor: "#B84953",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  footerText: { textAlign: "center", marginTop: 20, color: "#444" },
  linkText: { color: "#B84953", fontWeight: "700" },
});

export default RegisterScreen;
