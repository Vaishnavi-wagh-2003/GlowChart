import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductCard = ({ item, onPress }) => {
  // ✅ Keep only first 2 words
  const getShortName = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words.slice(0, 2).join(" "); // only first 2 words
  };

  const shortName = getShortName(item.title || item.name);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Image wrapper with pink background */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.thumbnail || item.image }}
          style={styles.image}
        />
      </View>

      {/* Product name (only 2 words) */}
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {shortName}
      </Text>

      {/* Product price */}
      <Text style={styles.price}>${item.price}</Text>

      {/* Wishlist button */}
      <TouchableOpacity style={styles.wishlistBtn}>
        <Ionicons name="heart-outline" size={20} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 8,
    padding: 12,
    elevation: 3,
    position: "relative",
    height: 220, // 🔑 ensures all cards same size,
    justifyContent: "center",
    marginLeft: 19,
    
  },
  imageWrapper: {
    backgroundColor: "#fde6eb",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 7,
    color: "#333",
  },
  price: {
    fontSize: 13,
    fontWeight: "500",
    color: "#444",
  },
  wishlistBtn: {
    position: "absolute",
    bottom: 9,
    right: 12,
    padding: 5,
  },
});

export default ProductCard;
