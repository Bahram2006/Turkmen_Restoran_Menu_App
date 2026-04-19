import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const burgers = [
  { id: "1", name: "Whopper", price: 6.99, image: require("../../assets/images/whopper.png") },
  { id: "2", name: "Cheese Burger", price: 4.99, image: require("../../assets/images/cheese.png") },
  { id: "3", name: "Chicken Burger", price: 5.49, image: require("../../assets/images/chicken.png") },
  { id: "4", name: "Double King Burger", price: 8.99, image: require("../../assets/images/double.png") },
];

export default function HomeScreen() {
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍔 Burger King</Text>
      <Text style={styles.subtitle}>Choose your favorite meal</Text>

      <FlatList
        data={burgers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            <Image source={item.image} style={styles.image} />

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>

            <TouchableOpacity 
              style={styles.button} 
              onPress={() => addToCart(item)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>

          </View>
        )}
      />
    </View>
  );
}

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