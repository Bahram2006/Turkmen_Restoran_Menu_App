import React, { createContext, useState } from "react";

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};