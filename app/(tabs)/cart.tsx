import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const { cart, removeFromCart, getTotal, clearCart } =
    useContext(CartContext);

  const router = useRouter();

  const theme = useColorScheme();
  const isDark = theme === "dark";

  // 🎨 COLORS (CLEAN WAY)
  const colors = {
    background: isDark ? "#121212" : "#ffffff",
    text: isDark ? "#ffffff" : "#000000",
    card: isDark ? "#1e1e1e" : "#f2f2f2",
    gray: "gray",
    green: "green",
    red: "#d62828",
    black: "#000",
    white: "#fff",
  };

  const handleOrder = () => {
    clearCart();
    Alert.alert("Success", "Your order has been placed!");
    router.push("/order-success");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      <Text style={[styles.title, { color: colors.text }]}>
        🛒 Your Cart
      </Text>

      {cart.length === 0 ? (
        <Text style={[styles.empty, { color: colors.gray }]}>
          Cart is empty
        </Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                
                <Text style={[styles.name, { color: colors.text }]}>
                  {item.name}
                </Text>

                <Text style={[styles.price, { color: colors.green }]}>
                  ${item.price}
                </Text>

                <TouchableOpacity
                  style={[styles.removeBtn, { backgroundColor: colors.black }]}
                  onPress={() => removeFromCart(index)}
                >
                  <Text style={[styles.removeText, { color: colors.white }]}>
                    Remove
                  </Text>
                </TouchableOpacity>

              </View>
            )}
          />

          <Text style={[styles.total, { color: colors.text }]}>
            Total: ${getTotal().toFixed(2)}
          </Text>

          <TouchableOpacity
            style={[styles.checkoutBtn, { backgroundColor: colors.red }]}
            onPress={handleOrder}
          >
            <Text style={[styles.checkoutText, { color: colors.white }]}>
              Order Now
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  empty: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    marginTop: 5,
  },
  removeBtn: {
    marginTop: 10,
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  removeText: {},
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  checkoutBtn: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});