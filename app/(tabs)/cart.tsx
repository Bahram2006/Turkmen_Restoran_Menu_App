import { View, Text, StyleSheet, FlatList } from "react-native";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartScreen() {
  const { cart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          )}
        />
      )}
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  empty: {
    fontSize: 18,
    color: "gray",
  },
  card: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    color: "green",
    marginTop: 5,
  },
});