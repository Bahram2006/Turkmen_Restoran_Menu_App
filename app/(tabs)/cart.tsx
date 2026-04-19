import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartScreen() {
  const { cart, removeFromCart, getTotal } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFromCart(index)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.total}>
            Total: ${getTotal().toFixed(2)}
          </Text>
        </>
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
  removeBtn: {
    marginTop: 10,
    backgroundColor: "black",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  removeText: {
    color: "#fff",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});