import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useRouter } from "expo-router";

// 🔥 CATEGORIES
const categories = ["Burgers", "Drinks", "Desserts"];

// 🔥 PRODUCTS (UPDATED)
const products = [
  {
    id: "1",
    name: "Whopper",
    price: 6.99,
    category: "Burgers",
    image: require("../../assets/images/whopper.png"),
  },
  {
    id: "2",
    name: "Cheese Burger",
    price: 4.99,
    category: "Burgers",
    image: require("../../assets/images/cheese.png"),
  },
  {
    id: "3",
    name: "Chicken Burger",
    price: 5.49,
    category: "Burgers",
    image: require("../../assets/images/chicken.png"),
  },
  {
    id: "4",
    name: "Double King Burger",
    price: 8.99,
    category: "Burgers",
    image: require("../../assets/images/double.png"),
  },
  {
    id: "5",
    name: "Cola",
    price: 2.99,
    category: "Drinks",
    image: require("../../assets/images/cola.png"),
  },
  {
    id: "6",
    name: "Ice Cream",
    price: 3.49,
    category: "Desserts",
    image: require("../../assets/images/icecream.png"),
  },
];

export default function HomeScreen() {
  const { addToCart } = useContext(CartContext);

  // 🔥 STATE
  const [selectedCategory, setSelectedCategory] = useState("Burgers");

  // 🔥 FILTER
  const filteredProducts = products.filter(
    (item) => item.category === selectedCategory,
  );

  // 🔥 ANIMATION FIX
  const scale = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍔 Burger King</Text>
      <Text style={styles.subtitle}>Choose your favorite meal</Text>

      {/* 🔥 CATEGORIES */}
      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.catBtn,
              selectedCategory === cat && styles.activeCat,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.catText,
                selectedCategory === cat && { color: "#fff" },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔥 PRODUCT LIST */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: Image.resolveAssetSource(item.image).uri,
                },
              })
            }
          >
            <Image source={item.image} style={styles.image} />

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>

            <Animated.View style={{ transform: [{ scale }] }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  animatePress();
                  addToCart(item);
                }}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// 🔥 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#d62828",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },

  // 🔥 CATEGORY
  categories: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },
  catBtn: {
    backgroundColor: "#eee",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeCat: {
    backgroundColor: "#d62828",
  },
  catText: {
    fontWeight: "600",
  },

  // 🔥 CARD
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    color: "green",
  },

  // 🔥 BUTTON
  button: {
    marginTop: 10,
    backgroundColor: "#d62828",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
