import { Tabs } from "expo-router";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const { cart } = useContext(CartContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#d62828",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}