import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useContext(UserContext);

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
      const userData = { fullName, email, password };
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      //login(userData);
      navigation.replace("Login");
      // Navigation to home screen is handled by the UserContext login function
    } catch (error) {
      Alert.alert("Error", "Failed to save user data");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />

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
        <MaterialCommunityIcons
          name="email-outline"
          size={20}
          color="#999"
          style={styles.icon}
        />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#999"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={20}
            color="#999"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Button */}
      <CustomButton
        title="Create Account"
        onPress={handleRegister}
        style={styles.button}
      />

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
    paddingVertical: 55,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    marginBottom: 60,
    width: "120%",
    alignSelf: "center",
    marginTop: -20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#B84953",
    fontFamily: "Playfair Display",
    textAlign: "center",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 2,
  },
  input: { flex: 1, padding: 15, color: "#989696" },
  icon: { marginLeft: 5 },
  button: {
    marginTop: 20,
    elevation: 3,
    marginBottom: 80,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#6C6C6C",
    fontFamily: "inter-medium",
    marginTop: 80,
  },
  linkText: { color: "#B84953", fontWeight: "700" },
});

export default RegisterScreen;