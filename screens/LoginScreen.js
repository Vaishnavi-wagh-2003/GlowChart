import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userData");
      if (!storedData) {
        Alert.alert("Error", "No account found. Please register first.");
        return;
      }

      const { email: storedEmail, password: storedPassword } =
        JSON.parse(storedData);

      if (email === storedEmail && password === storedPassword) {
        navigation.replace("Main");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Hello Again!</Text>
        <Text style={styles.subText}>Welcome back you’ve been missed.</Text>
      </View>

      {/* Email Input */}
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Enter your email Id"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
     <MaterialCommunityIcons name="email-outline" size={20} color="#999" style={styles.icon}/>
      </View>

      {/* Password Input */}
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

      {/* Forgot Password */}
      <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 15 }}>
        <Text style={styles.forgotText}>Forgot password</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or Continue With</Text>
        <View style={styles.line} />
      </View>

      {/* Social Login */}
     <View style={styles.socialRow}>
  <TouchableOpacity style={styles.socialBtn}>
    <Image source={require("../assets/icons/google.png")} style={styles.socialIcon} />
  </TouchableOpacity>

  <TouchableOpacity style={styles.socialBtn}>
    <Image source={require("../assets/icons/apple.png")} style={styles.socialIcon} />
  </TouchableOpacity>

  <TouchableOpacity style={styles.socialBtn}>
    <Image source={require("../assets/icons/facebook.png")} style={styles.socialIcon} />
  </TouchableOpacity>
</View>


      {/* Footer */}
      <Text style={styles.footerText}>
        Not a Member?{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("Register")}
        >
          Register Now
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFEDE8", padding: 20 },

  headerBox: {
    backgroundColor: "#F1B0B0",
    paddingVertical: 70,
    borderBottomLeftRadius:70 ,
    borderBottomRightRadius: 70,
    alignItems: "center",
    marginBottom: 40,
    width: "120%", 
    marginLeft: -35, 
  
  },
  headerText: { fontSize: 38, fontWeight: "800", color: "#B84953",fontFamily:"playfair-display",lineHeight:40,letterSpacing:0.8 },
  subText: { color: "#AD7373", marginTop: 5, fontSize: 20,fontFamily:"inter-medium" },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 25,
    elevation: 2,
  },
  input: { flex: 1, padding: 15 },
  icon: { marginLeft: 5 },

  forgotText: { color: "#B84953", fontSize: 13 },

  button: {
    backgroundColor: "#B84953",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 40,
  },
  line: { flex: 1, height: 1, backgroundColor: "#6C6C6C" },
  dividerText: { marginHorizontal: 10, color: "#6C6C6C" },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  socialBtn: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 10,
    elevation: 2,
    marginBottom: 40,
  },
socialIcon: {
  width: 40,
  height: 40,
  resizeMode: "contain",
},

  footerText: { textAlign: "center", color: "#6C6C6C" },
  linkText: { color: "#B84953", fontWeight: "700" },
});

export default LoginScreen;
