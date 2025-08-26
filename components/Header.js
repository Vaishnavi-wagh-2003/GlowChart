import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import notificationIcon from "../assets/icons/notification.png";
import bagIcon from "../assets/icons/bag.png";
const Header = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>Viorra</Text>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconBtn}>
          <Image
            source={notificationIcon}
            style={{
              width: 24,
              height: 24,

              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Image
            source={bagIcon}
            style={{
              width: 24,
              height: 24,

              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#777" />
        <TextInput placeholder="Search for all products" style={styles.input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#fff",
    borderBottomColor: "#000",
    borderWidth: 0.5,
    height: 140,
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#B84953",
    fontFamily: "Italiana-Regular",
    marginLeft: 5,
    marginTop: 5,
  },
  rightIcons: {
    position: "absolute",
    right: 15,
    top: 15,
    flexDirection: "row",
    marginTop: 15,
  },
  iconBtn: { marginLeft: 15 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 45,
    borderColor:"#8F8F8F",
    borderWidth:0.5
  },
  input: { flex: 1, marginLeft: 8 },
});

export default Header;
