import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from "react-native";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useRouter } from "expo-router";

// 🔥 CATEGORIES
const categories = ["Burgers", "Drinks", "Desserts"];

// 🔥 PRODUCTS
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
  const router = useRouter();

  // 🔥 STATE
  const [selectedCategory, setSelectedCategory] = useState("Burgers");
  const [search, setSearch] = useState("");

  // 🔥 FILTER + SEARCH
  const filteredProducts = products.filter(
    (item) =>
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 ANIMATION
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍔 Burger King</Text>
      <Text style={styles.subtitle}>Choose your favorite meal</Text>

      {/* 🔍 SEARCH */}
      <TextInput
        placeholder="Search food..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

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

      {/* 🔥 LIST */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* 🔥 CLICK → DETAIL */}
            <TouchableOpacity
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
            </TouchableOpacity>

            {/* 🔥 ADD TO CART */}
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
          </View>
        )}
      />
    </View>
  );
}

// 🎨 STYLES
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

  // 🔍 SEARCH
  input: {
    marginTop: 15,
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
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
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },

  // 🔥 BUTTON
  button: {
    marginTop: 10,
    backgroundColor: "#d62828",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});