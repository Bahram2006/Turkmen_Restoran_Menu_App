import { Tabs } from "expo-router";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function TabLayout() {
  const { cart } = useContext(CartContext);

  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ title: "Home" }} 
      />

      <Tabs.Screen 
        name="cart" 
        options={{ 
          title: "Cart",
          tabBarBadge: cart.length > 0 ? cart.length : undefined
        }} 
      />
    </Tabs>
  );
}