import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import OffersScreen from "../screens/OffersScreen";
import WishlistScreen from "../screens/WishlistScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Import your PNG icons
import HomeIcon from "../assets/icons/Home.png";
import OffersIcon from "../assets/icons/Offer.png";
import WishlistIcon from "../assets/icons/Wishlist.png";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#B84953",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 90,
          borderTopWidth:1,
          borderTopColor: "black",

        },
        tabBarItemStyle:{marginBottom:10},
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Home") {
            return (
              <Image
                source={HomeIcon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color, 
                  resizeMode: "contain",
                }}
              />
            );
          } else if (route.name === "Offers") {
            return (
              <Image
                source={OffersIcon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  resizeMode: "contain",
                }}
              />
            );
          } else if (route.name === "Wishlist") {
            return (
              <Image
                source={WishlistIcon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  resizeMode: "contain",
                }}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Ionicons
                name="person-circle-outline"
                size={26}
                color={color}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
