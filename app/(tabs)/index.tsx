import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const burgers = [
  { id: "1", name: "Whopper", price: 6.99 },
  { id: "2", name: "Cheese Burger", price: 4.99 },
  { id: "3", name: "Chicken Burger", price: 5.49 },
  { id: "4", name: "Double King Burger", price: 8.99 },
];

export default function HomeScreen() {
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
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>

            <TouchableOpacity style={styles.button}>
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
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
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
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});