import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import arrowIcon from "../assets/icons/arrow.png";
import productBagIcon from "../assets/icons/productBag.png";

const HomeScreen = () => {
  const { products, loading } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((w) => w !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#B84953" style={{ flex: 1 }} />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}  />
      <Header />

      {/* Section Header */}
      <View style={styles.productsHeader}>
        <Text style={styles.bestText}>Best Products</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}> Apply Filter</Text>
          <Entypo name="triangle-down" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.countText}>{products.length} products</Text>

      {/* Product Grid */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => setSelectedProduct(item)}
            isWishlisted={wishlist.includes(item.id)}
            onWishlistToggle={() => toggleWishlist(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

      {/* Product Detail Modal */}
      <Modal
        visible={!!selectedProduct}
        animationType="slide"
        onRequestClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <ScrollView style={styles.modalContainer}>
            {/* Product Image + Icons */}
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: selectedProduct.thumbnail }}
                  style={styles.modalImage}
                />

                {/* Back Arrow */}
                <TouchableOpacity
                  style={styles.topIconLeft}
                  onPress={() => setSelectedProduct(null)}
                >
                  <Image source={arrowIcon} style={styles.iconImage} />
                </TouchableOpacity>

                {/* Bag Icon */}
                <TouchableOpacity style={styles.topIconRight}>
                  <Image source={productBagIcon} style={styles.iconImage} />
                </TouchableOpacity>
              </View>
            </View>

            {/* View Similar + Share */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.similarBtn}>
                <Text style={styles.similarText}>View Similar</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="share" size={22} color="#444" />
              </TouchableOpacity>
            </View>

            {/* Title + Description */}
            <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
            <Text style={styles.modalDesc}>{selectedProduct.description}</Text>

            {/* Rating */}
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name={
                    i <= Math.round(selectedProduct.rating)
                      ? "star"
                      : "star-outline"
                  }
                  size={18}
                  color="#070707"
                />
              ))}
              <Text style={styles.ratingText}>
                {" "}
                {selectedProduct.rating.toFixed(2)}/5
              </Text>
            </View>
            <View style={styles.divider} />

            <Text style={styles.modalBrand}>
              Sold by : {selectedProduct.brand}
            </Text>

            {/* Price + Add to Bag */}
            <View style={styles.priceRow}>
              <View>
                <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
                <Text style={styles.discountPrice}>
                  ${selectedProduct.discountPercentage}
                </Text>
              </View>
              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.addBtnText}>Add to Bag</Text>
              </TouchableOpacity>
            </View>

          
           {/* Highlights */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Highlights</Text>
  <View style={styles.highlightsRow}>
    {/* Left Column */}
    <View style={styles.highlightCol}>
      <Text style={styles.highlightLabel}>Width</Text>
      <Text style={styles.highlightValue}>
        {selectedProduct.dimensions.width}
      </Text>

      <Text style={styles.highlightLabel}>Warranty</Text>
      <Text style={styles.highlightValue}>
        {selectedProduct.warrantyInformation}
      </Text>
    </View>

    {/* Divider */}
    <View style={styles.dividerVertical} />

    {/* Right Column */}
    <View style={styles.highlightCol}>
      <Text style={styles.highlightLabel}>Height</Text>
      <Text style={styles.highlightValue}>
        {selectedProduct.dimensions.height}
      </Text>

      <Text style={styles.highlightLabel}>Shipping</Text>
      <Text style={styles.highlightValue}>
        {selectedProduct.shippingInformation}
      </Text>
    </View>
  </View>
</View>


            {/* Ratings & Reviews */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
              {selectedProduct.reviews?.map((review, index) => (
                <View key={index} style={styles.reviewBox}>
                  <View style={styles.reviewHeader}>
                    <Image
                      source={{
                        uri: "https://randomuser.me/api/portraits/women/68.jpg",
                      }}
                      style={styles.reviewAvatar}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.reviewer}>{review.reviewerName}</Text>
                      <Text style={styles.reviewerEmail}>
                        {review.reviewerEmail}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Ionicons
                          key={i}
                          name={i <= review.rating ? "star" : "star-outline"}
                          size={14}
                          color="#070707"
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.comment}>{review.comment}</Text>
                </View>
              ))}
            </View>

           
          </ScrollView>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFEDE8" },
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 15,
    alignItems: "center",
  },
  bestText: { fontSize: 20, fontWeight: "700" },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
  },
  filterText: { fontSize: 14, fontWeight: "500" },
  countText: { marginLeft: 20, color: "#777", marginBottom: 10 },

  /* Modal */
  modalContainer: { flex: 1, padding: 20, backgroundColor: "#FFEDE8" },
  imageWrapper: {
    backgroundColor: "#fde6eb",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    position: "relative",
    height: 220,
    justifyContent: "center",
    width: "100%",
  },
  modalImage: {
    width: 150,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },

  topIconLeft: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 6,
  },
  topIconRight: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 6,
  },
  iconImage: { width: 20, height: 20, resizeMode: "contain" },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  similarBtn: {
    borderColor: "#B84953",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  similarText: { color: "#B84953", fontWeight: "600" },

  modalTitle: { fontSize: 22, fontWeight: "700", marginTop: 5 },
  modalDesc: { fontSize: 13, color: "#333", marginVertical: 5 },
  modalBrand: { fontSize: 15, color: "#777", marginBottom: 5,color:"#333333" },

  ratingRow: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  ratingText: { marginLeft: 6, fontSize: 14, color: "#444" },
  divider: { height: 1, backgroundColor: "#ddd", marginVertical: 8 },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  modalPrice: { fontSize: 22, fontWeight: "700", color: "#B84953" },
  discountPrice: {
    textDecorationLine: "line-through",
    fontSize: 14,
    color: "#999",
  },
  addBtn: {
    backgroundColor: "#B84953",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addBtnText: { color: "#fff", fontWeight: "600" },

  section: { marginTop: 15 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  highlightsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  highlightItem: { fontSize: 13, color: "#333", marginBottom: 5 },
highlightsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
  backgroundColor: "#FFEDE8",
  padding: 10,
  borderRadius: 8,
},
highlightCol: {
  flex: 1,
},
dividerVertical: {
  width: 1,
  backgroundColor: "#ccc",
  marginHorizontal: 12,
},
highlightLabel: {
  fontSize: 13,
  fontWeight: "600",
  color: "#000",
  marginBottom: 2,
},
highlightValue: {
  fontSize: 13,
  color: "#333",
  marginBottom: 10,
},

  reviewBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 2,
    paddingBottom: 30,
  },
  reviewHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  reviewAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 8 },
  reviewer: { fontWeight: "600", fontSize: 14 },
  reviewerEmail: { fontSize: 11, color: "#777" },
  comment: { fontSize: 13, color: "#444" },

  closeBtn: {
    marginTop: 20,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 30,
  },
  closeText: { fontSize: 16, fontWeight: "600", color: "#B84953" },
});

export default HomeScreen;
