import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../components/CustomButton";

const { height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Image Section with Gradient */}
        <ImageBackground
          source={require("../assets/images/gettingStart.png")}
          style={styles.image}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["transparent", "#C9A7A2"]}
            style={styles.gradient}
          />
        </ImageBackground>

        {/* Bottom Text + Button Section */}
        <View style={styles.content}>
          <Text style={styles.title}>Viorra</Text>
          <Text style={styles.subtitle}>Your Beauty, Delivered.</Text>

          <CustomButton
            title="Get Started"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#C9A7A2", // ensures background matches on iOS safe area
  },
  container: {
    flex: 1,
    backgroundColor: "#C9A7A2",
  },
  image: {
    width: "100%",
    height: height * 0.75, // reduced from 80% to 75% so text comes up
    justifyContent: "flex-end",
  },
  gradient: {
    width: "100%",
    height: height * 0.12, // responsive gradient fade
  },
   content: {
    position: "absolute",
    bottom: height * 0.12, // 👈 lift content 10% above bottom
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "500",
    color: "#fff",
    fontFamily: "Italiana-Regular",
    marginBottom: 8,
    textAlign: "center",
    lineHeight: 45,
    //letterSpacing:-0.32,
    horizontalAlign: "center",
  },
  subtitle: {
    fontSize: 17,
    color: "#fff",
    //marginTop: 2,
    marginBottom: 35,
    textAlign: "center",
    fontFamily:"inter-light",
    lineHeight: 25,
  },
});

export default OnboardingScreen;
