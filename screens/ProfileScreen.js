import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const { logout } = useContext(UserContext);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    //await AsyncStorage.removeItem("userData");
    logout(navigation); 
  };

  const MenuItem = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={20} color="#070707" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header with 3-dot menu */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Profile</Text>
        <TouchableOpacity style={styles.menuCircle}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* User Card */}
      <View style={styles.userCard}>
        <Image
          source={{
            uri:
              user?.avatar ||
              "https://randomuser.me/api/portraits/women/44.jpg",
          }}
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.userName}>{user?.fullName || "Guest User"}</Text>
          <Text style={styles.userEmail}>{user?.email || "guest@email.com"}</Text>
        </View>
        <TouchableOpacity>
          <Feather name="edit" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* First Menu Section */}
      <View style={styles.menuCard}>
        <MenuItem
          icon="location-outline"
          title="Address"
          subtitle="Manage your saved address"
        />
        <MenuItem
          icon="file-tray-stacked-outline"
          title="Order History"
          subtitle="View your past orders"
        />
        <MenuItem icon="language-outline" title="Language" />
        <MenuItem icon="notifications-outline" title="Notifications" />
      </View>

      {/* Second Menu Section */}
      <View style={styles.menuCard}>
        <MenuItem icon="chatbox-ellipses-outline" title="Contact Us" />
        <MenuItem icon="help-circle-outline" title="Get Help" />
        <MenuItem icon="lock-closed-outline" title="Privacy Policy" />
        <MenuItem icon="settings-outline" title="Terms and Conditions" />

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <AntDesign name="logout" size={20} color="#070707" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFEDE8", padding: 20, paddingTop: 40 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  menuCircle: {
    backgroundColor: "#fff",
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  userCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  userName: { fontSize: 16, fontWeight: "600" },
  userEmail: { fontSize: 13, color: "#666" },

  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  menuTitle: { fontSize: 15, fontWeight: "500" },
  menuSubtitle: { fontSize: 12, color: "#777" },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 15,
  },
  logoutText: {
    marginLeft: 8,
    color: "#B84953",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default ProfileScreen;
