import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const { addToCart } = useContext(CartContext);

  // ✅ SAFE PARAMS (FIXED)
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const price = Array.isArray(params.price) ? params.price[0] : params.price;
  const image = Array.isArray(params.image) ? params.image[0] : params.image;

  return (
    <View style={styles.container}>
      {/* ✅ IMAGE FIX */}
      <Image source={{ uri: image as string }} style={styles.image} />

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>${price}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          addToCart({
            id,
            name,
            price: Number(price),
            image,
          })
        }
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    color: "green",
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#d62828",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});